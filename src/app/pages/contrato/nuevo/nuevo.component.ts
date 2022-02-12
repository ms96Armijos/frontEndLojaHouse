import { NgForm } from '@angular/forms';
import { MILISEGUNDOS } from './../../../config/config';
import { Contrato } from './../../../models/contrato.model';
import { ActivatedRoute } from '@angular/router';
import { VisitaService } from './../../../services/visita/visita.service';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Usuario } from './../../../models/usuario.model';
import { Visita } from './../../../models/visita.model';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import swal from 'sweetalert';
import * as moment from 'moment';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  token = localStorage.getItem('token');
  tokenPayload = decode(this.token);

  visitas: Visita = new Visita(null, null, null, null, null);
  usuarioarrendador: Usuario = new Usuario(null, null, null, null, null);
  now = moment();
  fechaHoy;
  fechaDentroDeUnMes;

  constructor(public _usuarioService: UsuarioService,
    public toastr: ToastrService,
    public _contratoService: ContratoService,
    public _visitaService: VisitaService,
    public activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(parametros => {
      const id = parametros['idvisita'];
      this.obtenerVisita(id);
      this.obtenerUsuarioArrendador(this.tokenPayload.usuario._id);
    });

  }

  ngOnInit(): void {
    this.fechaHoy = this.now.format('YYYY-MM-DD');
    this.fechaDentroDeUnMes = this.now.add(1, 'months').format('YYYY-MM-DD');
  }

  obtenerVisita(id: string) {
    this._visitaService.obtenerVisita(id)
      .subscribe(visita => {

        this.visitas = visita;
      });
  }

  obtenerUsuarioArrendador(id: string) {
    this._usuarioService.obtenerUsuario(id)
      .subscribe(usuario => {

        this.usuarioarrendador = usuario;
        // console.log('user: '+usuario.nombre );
      });
  }


  crearContrato(forma: NgForm) {
    if (forma.invalid) {
      this.toastr.warning('Por favor complete los campos del formulario', '¡Lo siento!');
      return;
    }

    const nombrecontrato = this.visitas.usuarioarrendatario.apellido + '(' + this.visitas.inmueble.tipo+')';

    const inmueblesId = this.visitas.inmueble._id;
    const arrendadorId = this.usuarioarrendador._id;
    const arrendatarioid = this.visitas.usuarioarrendatario._id;


    //const StartDate = new Date(forma.value.fechainicio);
    //const EndDate = new Date(forma.value.fechafin);

    // const tiempocontrato = Math.round((Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
    // Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / MILISEGUNDOS);

    //if (tiempocontrato > 0){
    const contrato = new Contrato(nombrecontrato, forma.value.fechainicio,
      forma.value.fechafin, forma.value.monto, null, Object(inmueblesId),
      Object(arrendadorId), Object(arrendatarioid), 'BORRADOR');

      console.log(forma.value.fechainicio);

      if(!this.visitas.usuarioarrendatario.cedula){
        this.toastr.error('Por favor solicite a '+ this.visitas.usuarioarrendatario.nombre+' que ingrese su número de cédula', '¡Lo siento!');
        return;
      }
      console.log(this.visitas.usuarioarrendatario.cedula);

      swal({
        title: '¿Está seguro de crear el contrato?',
        text: 'Recuerde que no podrá modificar este contrato, por favor revise bien la información del contrato antes de continuar.',
        icon: 'warning',
        buttons: [
          'Cancelar',
          'Continuar'
        ],
        dangerMode: false,
      })
        .then(crearContratoAlquiler => {



         if(this.visitas.estado === 'ACEPTADA'){
            if (crearContratoAlquiler) {
              this._contratoService.crearContrato(contrato)
              .subscribe(/*resp => {
                  this.router.navigate(['/plantillacontrato', contrato._id]);
                }*/
                resp => this.aceptarVisita(this.visitas));
            }
         }else{
          swal(
            '¡Lo siento!',
            'Para poder continuar debes aceptar la visita previamente.\n Acepta la visita y vuelve a intentarlo',
            'warning'
          );
         }
        });






    //}else{
    // this.toastr.error('No se puede establecer un tiempo menor a cero meses', 'Por favor elija una fecha correcta');
    //}

  }

  aceptarVisita(visita: Visita) {

    visita.estado = 'ATENDIDA';
          this._visitaService.aceptarVisita(visita)
            .subscribe();
          this.toastr.success('Visita ' + visita.estado);
  }




}
