import { Visita } from './../../../../models/visita.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitaService } from './../../../../services/visita/visita.service';
import { UsuarioService } from './../../../../services/usuario/usuario.service';
import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { Usuario } from './../../../../models/usuario.model';
import { Inmueble } from './../../../../models/inmueble.model';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import swal from 'sweetalert';
declare function inicializarPluginsSidebar();

@Component({
  selector: 'app-crearvisita',
  templateUrl: './crearvisita.component.html',
  styleUrls: ['./crearvisita.component.css']
})
export class CrearvisitaComponent implements OnInit {

  inmuebles: Inmueble = new Inmueble(null, null, null, null, null, null, null, null, null);
  usuarios: Usuario = new Usuario(null, null, null, null, null);

  token = localStorage.getItem('token');
  tokenPayload = decode(this.token);

  timer = null;
  time = 1000;
  descripcion: string;



  constructor(public _inmuebleService: InmuebleService,
    public _usuarioService: UsuarioService,
    public _visitaService: VisitaService,
    public router: Router, public activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(parametros => {
      const id = parametros['idinmueble'];
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.obtenerInmueble(id);
      this.obtenerArrendatario();
    }, this.time);
    });

  }

  ngOnInit(): void {
    inicializarPluginsSidebar();

  }

  obtenerInmueble(id: string) {
    this._inmuebleService.obtenerInmueble(id)
      .subscribe(inmueble => {

        this.inmuebles = inmueble;
        this.descripcion = 'Hola, estoy interesado en su inmueble '+ this.inmuebles.nombre +', y me gustaría estar en contacto con usted para poder llegar a un acuerdo. Muchas gracias por su tiempo, hasta luego.';
        //console.log(this.inmuebles);
      });
  }

  obtenerArrendatario() {
    if(!this.tokenPayload.usuario._id){
      this._usuarioService.obtenerUsuario(localStorage.getItem(this.tokenPayload.usuario._id))
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        //console.log("User: "+this.usuarios);
      });
    }

  }

  crearVisita(forma: NgForm) {

    let arrendatario_id = this.tokenPayload.usuario._id;
    let idinmueble = this.inmuebles._id;

    console.log(arrendatario_id + ' ' + idinmueble)
    if (forma.invalid) {
      return;
    }

    //const fecha = new Date(forma.value.fecha);

    if(this.tokenPayload.usuario.rol === 'ADMINISTRADOR' || this.tokenPayload.usuario.rol === 'ARRENDADOR'){
      swal('Uppss...' + '', 'No puedes realizar esta acción', 'warning');
      return;
    }

    const visita = new Visita(forma.value.fecha, this.descripcion, Object(idinmueble), Object(arrendatario_id), 'PENDIENTE');

    if(!visita.fecha){
      swal('Uppss...' + '', 'Debes ingresar la fecha de visita', 'warning');
      return;
    }
    //console.log(visita);
    this._visitaService.crearVisita(visita)
      .subscribe(resp => {
       this.router.navigate(['/visitas-arrendatario']);
      });
  }

}
