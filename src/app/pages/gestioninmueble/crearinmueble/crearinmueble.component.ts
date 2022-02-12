import { ServiciosbasicosService } from './../../../services/serviciosbasicos/serviciosbasicos.service';
import { NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { InmuebleService } from './../../../services/inmueble/inmueble.service';
import { Inmueble } from './../../../models/inmueble.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import decode from 'jwt-decode';

declare const require;


@Component({
  selector: 'app-crearinmueble',
  templateUrl: './crearinmueble.component.html',
  styleUrls: ['./crearinmueble.component.css']
})
export class CrearinmuebleComponent implements OnInit {


  public items = [];
  public itemsFinales = [];
  public garaje = [{display: 'garaje', value: 1}];
  nombres: string;

  contador;

  limiteNombre: boolean;
  vacioNombre: boolean;
  limiteDescripcion: boolean;
  limiteDireccion: boolean;

  timer = null;
  time = 1000;


  /**Logica normal */

   token = localStorage.getItem('token');
   tokenPayload = decode(this.token);

   idInmuebleCreado: string;
   inmuebleCreado = false;
   banderaCreadoActualizado = false;


   //banderaCrearInmuieble = false;

  inmuebles: Inmueble = new Inmueble(null, null, null, null, null, null, null, null, null);


  //ARREGLO DE CIUDADES
    ciudades;
    ciudades2 = [];
  //ARREGLO DE PROVINCIAS
    provincias = [];
  //ARREGLO DE BARRIOS

    barrios: any = [];
    barrios2: any = require('../../../../assets/paises/loja.json');

    ciudadSeleccionada: string;
    provinciaSeleccionada: string;
    barrioSeleccionado: string;

  desde = 0;
  servicios = [];


  constructor(
    public _inmuebleService: InmuebleService,
               public _usuarioService: UsuarioService,
               public router: Router,
               public toastr: ToastrService,
               public _basicosService: ServiciosbasicosService,
               public activatedRoute: ActivatedRoute ) {

      activatedRoute.params.subscribe(parametros => {
        let id = parametros['idinmueble'];

        if (id !== 'nuevo'){
          this.obtenerInmueble(id);
          this.idInmuebleCreado = id;
          this.inmuebleCreado = true;
          //this.banderaCrearInmuieble = true;
        }
      });


    }

  ngOnInit(): void {
    this._basicosService.cargarServicios()
    .subscribe(servicios => {
      this.servicios = servicios;

      for (let i = 0; i < servicios.length; i++) {
        this.items.push({display: servicios[i]['nombre'], value: (i+20)});
      }
      //console.log(this.items);
    });

    for (let i = 0; i < this.barrios2.paises.length; i++) {
      this.provincias.push(this.barrios2.paises[i].provincia);
      this.ciudades2.push(this.barrios2.paises[i].ciudad);
     /* for (let a = 0; a < this.barrios2.paises[i].barrio.length; a++) {
        this.barrios.push(this.barrios2.paises[i].barrio[a].nombre)
      }*/

    }



  }




  obtenerInmueble(id: string){
    this._inmuebleService.obtenerInmueble( id )
    .subscribe( inmueble => {
      this.inmuebles = inmueble;
      this.garaje.pop();
      for (let i = 0; i < inmueble.servicio.length; i++) {
        this.garaje.push({display: inmueble.servicio[i], value: (i+2)});
      }
      //console.log(this.inmuebles);

    });
  }

  seleccionarCiudad(event: any){
    if(event.target.value.length > 0){
      this.ciudadSeleccionada = event.target.value;
    }
  }



  seleccionarProvincia(i: number, provincia: string){
    this.provinciaSeleccionada = provincia;

    for (let indice = 0; indice < this.ciudades2.length; indice++) {

      if(indice === i){
        this.ciudades =""
        this.ciudades = this.ciudades2[indice]
        this.ciudadSeleccionada = this.ciudades2[indice]



        this.barrios= [""]
        for (let l = 0; l < this.barrios2.paises.length; l++) {
          for (let a = 0; a < this.barrios2.paises[l].barrio.length; a++) {
            if(this.barrios2.paises[l].code === i.toString()){
              this.barrios.push(this.barrios2.paises[l].barrio[a].nombre)
            }

          }

        }
       }
    }
  }
  seleccionarBarrio(barrio: string){
    if(barrio.length > 0){
      this.barrioSeleccionado = barrio;
    }
  }

  crearInmueble(forma: NgForm) {
    if (forma.invalid) {
      return;
    }


    let idArrendador = this.tokenPayload.usuario._id;


    for (let i = 0; i < forma.value.itemServ.length; i++) {
      this.itemsFinales.push(forma.value.itemServ[i]['display']);

    }

    //console.log(this.itemsFinales);

    this.inmuebles.nombre = forma.value.nombre;
    this.inmuebles.descripcion = forma.value.descripcion;
    this.inmuebles.direccion = forma.value.direccion;
    this.inmuebles.codigo = forma.value.codigo;
    this.inmuebles.tipo = forma.value.tipo;
    this.inmuebles.precioalquiler = forma.value.precioalquiler;
    this.inmuebles.garantia = forma.value.garantia;
    this.inmuebles.servicio = this.itemsFinales;
    this.inmuebles.estado = 'DISPONIBLE';
    this.inmuebles.publicado = 'PRIVADO';
    this.inmuebles.usuario = Object(idArrendador);
    this.inmuebles.ciudad = this.ciudadSeleccionada;
    this.inmuebles.provincia = this.provinciaSeleccionada;
    this.inmuebles.barrio = this.barrioSeleccionado;

    if(forma.value.garantia === undefined){
      this.inmuebles.garantia='0';
    }

    this._inmuebleService.crearInmueble(this.inmuebles)
      .subscribe(resp => {
        this.idInmuebleCreado = resp._id;
        this.inmuebleCreado = true;
        this.banderaCreadoActualizado = true;
        clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.agregarImagenesAlInmuebleCreado()
      }, this.time);
      });

  }


  agregarImagenesAlInmuebleCreado(){
    this.router.navigate(['/subirfotosinmueble', this.idInmuebleCreado]);
  }

  regresarPagina(){
    window.history.back();
  }

  limitarNombre(event, texto){

    switch(texto){
      case 'nombre':
        this.contador = event.target.value.length
      if(this.contador >= 0 && this.contador<=300){
        this.limiteNombre = true;
      }else{
        this.limiteNombre = false;
      }
      if(this.contador === 300){
        return false;
      }
      if(this.contador === 0){
        return false;
      }
      //console.log(this.contador)
        break;

        /**CASE DESCRIPCIÓN */
        case 'descripcion':
        this.contador = event.target.value.length
      if(this.contador > 0 && this.contador<=500){
        this.limiteDescripcion = true;
      }else{
        this.limiteDescripcion = false;
      }
      if(this.contador === 500){
        return false;
      }
      //console.log(this.contador)
        break;


      /**CASE DESCRIPCIÓN */
      case 'direccion':
        this.contador = event.target.value.length
      if(this.contador > 0 && this.contador<=400){
        this.limiteDireccion = true;
      }else{
        this.limiteDireccion = false;
      }
      if(this.contador === 400){
        return false;
      }
      //console.log(this.contador)
        break;

      }
   }

  public restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return new RegExp(/[\d\s]/).test(input);
   }



}
