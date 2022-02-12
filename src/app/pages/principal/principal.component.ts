import { Usuario } from './../../models/usuario.model';
import { TIPOSDEINMUEBLE, PRECIODEALQUILER } from './../../config/config';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { InmuebleService } from './../../services/inmueble/inmueble.service';
import { Inmueble } from './../../models/inmueble.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import decode from 'jwt-decode';
declare const require;

declare function inicializarPluginsSidebar();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  inmuebles: Inmueble[] = [];
  precios: String[]= PRECIODEALQUILER;
  //ubicaciones: string[]=[].concat("Seleccionar...", BARRIOSDELOJA);
  tipos: string[]=TIPOSDEINMUEBLE;

  usuario: Usuario = new Usuario(null, null, null, null, null);

  desde: number = 0;
  estaLogueado = false;
  rol="";

  location: string = "Motupe";
  type: string = "Casa";
  price: String = '50';

  timer = null;
  time = 500;

  tokenPayload;

   token = localStorage.getItem('token');

   barrios: any = [];
   barrios2: any = require('../../../assets/paises/loja.json');

  constructor(public _inmuebleService: InmuebleService, public toastr: ToastrService, public router: Router, public _usuarioService: UsuarioService) {
    this.logueado();
  }

  ngOnInit(): void {
    //clearTimeout(this.timer);
    //this.timer = setTimeout(() => {
    inicializarPluginsSidebar();
    this.cargarInmuebles();
  //}, this.time);

  if(this.token != null || this.token != undefined){
    this.tokenPayload = decode(this.token);
   }

    if(this.tokenPayload != undefined){
      this.obtenerUsuario(this.tokenPayload.usuario._id);
    }

    for (let i = 0; i < this.barrios2.paises.length; i++) {
      for (let a = 0; a < this.barrios2.paises[i].barrio.length; a++) {
        this.barrios.push(this.barrios2.paises[i].barrio[a].nombre)
      }

    }

  }

  cargarInmuebles() {

    this._inmuebleService.cargarInmueblesPulicos(this.desde)
      .subscribe(inmuebles => this.inmuebles = inmuebles);

  }


  obtenerUsuario(id: string){
    this._usuarioService.obtenerUsuario( id )
    .subscribe( usuarioObtenido => {

      this.usuario = usuarioObtenido;
      this.rol =this.usuario.rol;
    // console.log('visita: '+this.usuario.rol );
    });
  }


   logueado() {

    if (!this.token) {
      this.estaLogueado = false;
      //this.toastr.error('No estás logueado');
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



        //console.log(precio)
        this._inmuebleService.busquedaAnidadaInmuebles(tipo, ubicacion, precio)
          .subscribe(inmuebles =>  {
            console.log(inmuebles)
            this.inmuebles = inmuebles
          });
      }

      ubicacionInmueble(ubicacion:string){
        this.location = ubicacion;
        //console.log('hols '+ubicacion)
      }
      tipoInmueble(tipo:string){
        this.type = tipo;
      }
      precioInmueble(precio:String){
        this.price = precio;
      }


      cadena(){
        //console.log(this.type)
        //console.log(this.price)
        //console.log(this.location)

        this.busquedaAnidadaInmuebles(this.type, this.location, this.price);
      }

      buscarInmuebles(termino: string) {
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          //console.log(termino);
            if (termino.length <= 0) {
              this.cargarInmuebles();
              return;
            }
            this._inmuebleService.buscarInmueblesPaginaPrincipal(termino)
              .subscribe(inmuebles => this.inmuebles = inmuebles);
            }, this.time);
          }

}
