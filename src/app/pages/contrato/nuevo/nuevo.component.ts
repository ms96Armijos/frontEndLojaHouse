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
      return;
    }

    const nombrecontrato = this.visitas.usuarioarrendatario.apellido + '_' + this.visitas.inmueble.tipo;

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
      Object(arrendadorId), Object(arrendatarioid));

    this._contratoService.crearContrato(contrato)
      .subscribe(/*resp => {
          this.router.navigate(['/plantillacontrato', contrato._id]);
        }*/);
    //}else{
    // this.toastr.error('No se puede establecer un tiempo menor a cero meses', 'Por favor elija una fecha correcta');
    //}

  }

}
