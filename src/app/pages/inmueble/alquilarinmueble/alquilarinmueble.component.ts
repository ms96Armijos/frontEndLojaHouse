import { catchError } from 'rxjs/operators';
import { Contrato } from './../../../models/contrato.model';
import { EXPRESIONEMAIL, MILISEGUNDOS } from './../../../config/config';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { ActivatedRoute } from '@angular/router';
import { InmuebleService } from './../../../services/inmueble/inmueble.service';
import { Usuario } from './../../../models/usuario.model';
import { Inmueble } from './../../../models/inmueble.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import swal from 'sweetalert';



@Component({
  selector: 'app-alquilarinmueble',
  templateUrl: './alquilarinmueble.component.html',
  styleUrls: ['./alquilarinmueble.component.css']
})
export class AlquilarinmuebleComponent implements OnInit {

  @ViewChild('nombreArrendatario') nombreArrendatario: ElementRef;
  @ViewChild('myModalClose') modalClose;

  inmuebles: Inmueble = new Inmueble(null, null,null, null, null, null, null, null, null);
  usuarioArrendatario: Usuario = new Usuario(null, null, null, null, null);
  registrarUsuarioArrendatario: Usuario = new Usuario();

  email = EXPRESIONEMAIL;
  usuarioEncontrado: boolean;


  timer = null;
  time = 2000;


  constructor(public _inmuebleService: InmuebleService,
    public activatedRoute: ActivatedRoute,
    public _contratoService: ContratoService,
    public toastr: ToastrService,
    public _usuarioService: UsuarioService) {

    activatedRoute.params.subscribe(parametros => {
      let id = parametros['idinmueble'];
      if (id !== 'nuevo') {
        this.obtenerInmueble(id);

      }
    });
  }

  ngOnInit(): void {
  }

  obtenerInmueble(id: string) {
    this._inmuebleService.obtenerInmueble(id)
      .subscribe(inmueble => {
        this.inmuebles = inmueble;
        //console.log(this.inmuebles);

      });
  }

  registrarArrendatario(forma: NgForm) {
    const referencia = this.nombreArrendatario.nativeElement;

    if (forma.invalid) {
      return;
    }

    this.registrarUsuarioArrendatario.nombre = forma.value.nombre;
    this.registrarUsuarioArrendatario.apellido = forma.value.apellido;
    this.registrarUsuarioArrendatario.movil = forma.value.celular;
    this.registrarUsuarioArrendatario.correo = forma.value.email;
    this.registrarUsuarioArrendatario.rol = 'ARRENDATARIO';
    this.registrarUsuarioArrendatario.estado = '1';

    /*const usuario = new Usuario(forma.value.nombre,
      forma.value.apellido, forma.value.celular, forma.value.email, 'ARRENDATARIO',
      null, null, null, null, '1');*/

    this._usuarioService.crearUsuario(this.registrarUsuarioArrendatario)
      .subscribe();
    referencia.setAttribute('value', this.registrarUsuarioArrendatario.nombre + ' ' + this.registrarUsuarioArrendatario.apellido);

    this.modalClose.nativeElement.click();
  }

  buscarArrendatario(correo: string) {



    clearTimeout(this.timer);
    this.timer = setTimeout(() => {

      if(!this.validateEmail(correo)){
        return this.toastr.error('Debe ser un correo válido');
       }


      const referencia = this.nombreArrendatario.nativeElement;
      referencia.setAttribute('value', '');
      this.usuarioArrendatario = null;

      console.log(correo);
      if (correo.length <= 0) {
        referencia.setAttribute('value', '');
        return;
      }

      this._usuarioService.buscarArrendatario(correo)
        .subscribe(usuario => {
          if (usuario) {
            this.usuarioEncontrado=true;
            this.usuarioArrendatario = usuario;
            referencia.setAttribute('value', usuario.nombre + ' ' + usuario.apellido);

            if(referencia.getAttribute('value') === 'undefined undefined'){
              this.usuarioEncontrado=false;
            }

          }else{
            this.usuarioEncontrado=false;
            this.usuarioArrendatario = null;
            referencia.setAttribute('value', '');
          }
        });
    }, this.time);
  }

  crearContrato(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    if(forma.value.fechainicio === '' || forma.value.fechafin === ''){
      this.usuarioEncontrado=false;
      this.toastr.error('Por favor seleccione la fecha de incio y finalización del contrato');
    }

    const referencia = this.nombreArrendatario.nativeElement;
    if (!referencia.getAttribute('value')) {
      this.usuarioEncontrado=false;
      this.toastr.error('El usuario arrendatario/a no existe');
      return;
    }

    const nombrecontrato = this.usuarioArrendatario.apellido + '_' + this.inmuebles.tipo;
    const inmueblesId = this.inmuebles._id;
    const arrendadorId = this.inmuebles.usuario._id;
    const arrendatarioid = this.usuarioArrendatario._id;
    //const StartDate = new Date(forma.value.fechainicio);
    //const EndDate = new Date(forma.value.fechafin);



    //const tiempocontrato = Math.round((Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
      //Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / MILISEGUNDOS);


    // if (tiempocontrato > 0) {
    const contrato = new Contrato(nombrecontrato, forma.value.fechainicio,
      forma.value.fechafin, forma.value.monto, null, Object(inmueblesId),
      Object(arrendadorId), Object(arrendatarioid));


    swal({
      title: '¿Está seguro de generar el siguiente contrato de alquiler?',
      text: 'Recuerde que no podrá modificar este contrato, por favor revise bien la información del contrato antes de continuar.',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._contratoService.crearContrato(contrato)
            .subscribe(/*resp => {
                this.router.navigate(['/plantillacontrato', contrato._id]);
              }*/);
        }
      });



    //} else {
    //  this.toastr.error('No se puede establecer un tiempo menor a cero meses', 'Por favor elija una fecha correcta');
    //}

  }
  regresarPagina(){
    window.history.back();
  }

   validateEmail(email: string) {

    if( !this.email.test( email ) ) {
      this.usuarioEncontrado=false;
        return false;
    } else {
        return true;
    }
}


}
