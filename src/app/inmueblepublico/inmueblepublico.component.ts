import { UsuarioService } from './../services/usuario/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { InmuebleService } from './../services/inmueble/inmueble.service';
import { Inmueble } from './../models/inmueble.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inmueblepublico',
  templateUrl: './inmueblepublico.component.html',
  styleUrls: ['./inmueblepublico.component.css']
})
export class InmueblepublicoComponent implements OnInit {
  idInmueble: string;
  inmueble: Inmueble;
  estaLogueado = false;

  constructor( public _inmuebleService: InmuebleService, public toastr: ToastrService, public activatedRoute: ActivatedRoute, public _usuarioService: UsuarioService ) {
    this.logueado();

    activatedRoute.params.subscribe(parametros => {
      this.idInmueble = parametros['idinmueble'];
      console.log(this.idInmueble);
    });
  }

  ngOnInit(): void {
    this.obtenerInmueble(this.idInmueble);
  }

  obtenerInmueble(id: string){
    this._inmuebleService.obtenerInmueblePublico( id )
    .subscribe( inmuebleObtenido => {

      this.inmueble = inmuebleObtenido;
      console.log(this.inmueble)
    });
  }

  logueado() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.estaLogueado = false;
      this.toastr.error('No estás logueado');
      return this.estaLogueado;
      //this.router.navigate(['/login']);
    } else {
      this.estaLogueado = true;
      return this.estaLogueado;
    }

  }


}
