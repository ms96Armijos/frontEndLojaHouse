import { BARRIOSDELOJA, TIPOSDEINMUEBLE, PRECIODEALQUILER } from './../../config/config';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { InmuebleService } from './../../services/inmueble/inmueble.service';
import { Inmueble } from './../../models/inmueble.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare function inicializarPluginsSidebar();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  inmuebles: Inmueble[] = [];
  precios: String[]= PRECIODEALQUILER;
  ubicaciones: string[]=[].concat("Seleccionar...", BARRIOSDELOJA);
  tipos: string[]=TIPOSDEINMUEBLE;

  desde: number = 0;
  estaLogueado = false;

  location: string = "Motupe";
  type: string = "Casa";
  price: String = '50';

  timer = null;
  time = 500;

  constructor(public _inmuebleService: InmuebleService, public toastr: ToastrService, public router: Router, public _usuarioService: UsuarioService) {
    this.logueado();
  }

  ngOnInit(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
    inicializarPluginsSidebar();
    this.cargarInmuebles();
  }, this.time);
  }

  cargarInmuebles() {

    this._inmuebleService.cargarInmueblesPulicos(this.desde)
      .subscribe(inmuebles => this.inmuebles = inmuebles);
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

  cambiarPaginacion(valor: number) {
    const desde: number = this.desde + valor;

    if (desde >= this._inmuebleService.totalInmuebles) {
      this.toastr.error('Solo existen ' + this._inmuebleService.totalInmuebles + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }


    this.desde += valor;
    this.cargarInmuebles();
  }



  busquedaAnidadaInmuebles(tipo: string, ubicacion: string, precio: String) {

      /*console.log(termino);
        if (termino.length <= 0) {
          this.cargarInmuebles();
          return;
        }*/

        if(precio === '<50'){
          precio = '0-50';
        }

        if(precio === '>200'){
          precio = '200-0';
        }

        console.log(precio)
        this._inmuebleService.busquedaAnidadaInmuebles(tipo, ubicacion, precio)
          .subscribe(inmuebles =>  this.inmuebles = inmuebles);
      }

      ubicacionInmueble(ubicacion:string){
        this.location = ubicacion;
      }
      tipoInmueble(tipo:string){
        this.type = tipo;
      }
      precioInmueble(precio:String){
        this.price = precio;
      }


      cadena(){
        console.log(this.type)
        console.log(this.price)
        console.log(this.location)

        this.busquedaAnidadaInmuebles(this.type, this.location, this.price);
      }

}
