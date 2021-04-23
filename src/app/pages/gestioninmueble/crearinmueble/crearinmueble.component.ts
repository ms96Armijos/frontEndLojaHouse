import { BARRIOSDELOJA, CIUDADES, PROVINCIAS, EXPRESIONCODIGOCASA } from './../../../config/config';
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

  codeCasa = new RegExp(EXPRESIONCODIGOCASA);
  limiteNombre: boolean;
  vacioNombre: boolean;
  limiteDescripcion: boolean;
  limiteDireccion: boolean;


  /**Logica normal */

   token = localStorage.getItem('token');
   tokenPayload = decode(this.token);

   idInmuebleCreado: string;
   banderaCreadoActualizado = false;


   //banderaCrearInmuieble = false;

  inmuebles: Inmueble = new Inmueble(null, null, null, null, null, null, null, null, null);


  //ARREGLO DE CIUDADES
    ciudades = CIUDADES;
  //ARREGLO DE PROVINCIAS
    provincias = PROVINCIAS;
  //ARREGLO DE BARRIOS

    barrios: any = BARRIOSDELOJA;

    ciudadSeleccionada: string = "Loja";
    provinciaSeleccionada: string = "Loja";
    barrioSeleccionado: string = "Gran Colombia";

  desde = 0;
  servicios = [];

 /* servicioselegidos = [];
  nuevservicios = [];*/

  /*drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }*/

  constructor( public _inmuebleService: InmuebleService,
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
      console.log(this.items);
    });

  }

  obtenerInmueble(id: string){
    this._inmuebleService.obtenerInmueble( id )
    .subscribe( inmueble => {
      this.inmuebles = inmueble;
      this.garaje.pop();
      for (let i = 0; i < inmueble.servicio.length; i++) {
        this.garaje.push({display: inmueble.servicio[i], value: (i+2)});
      }
      console.log(this.inmuebles);
    });
  }




  seleccionarCiudad(ciudad: string){
    this.ciudadSeleccionada = ciudad;
  }

  seleccionarProvincia(provincia: string){
    this.provinciaSeleccionada = provincia;
  }
  seleccionarBarrio(barrio: string){
    this.barrioSeleccionado = barrio;
  }

  crearInmueble(forma: NgForm) {
    if (forma.invalid) {
      return;
    }


    let idArrendador = this.tokenPayload.usuario._id;

    /*for (let serv of this.servicioselegidos) {
      //console.log(serv.nombre); // 1, "string", false
      this.nuevservicios.push(serv.nombre);
    }*/


    for (let i = 0; i < forma.value.itemServ.length; i++) {
      this.itemsFinales.push(forma.value.itemServ[i]['display']);

    }

    console.log(this.itemsFinales);

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
        this.banderaCreadoActualizado = true;

       /* if(!this.banderaCrearInmuieble){

        }*/
        //this.router.navigate(['/inmuebles']);
      });
  }



  /*cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._basicosService.totalServicios) {
      this.toastr.error('Solo existen ' + this._basicosService.totalServicios + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarServicios();
  }*/

  /*cargarServicios() {
    this._basicosService.cargarServicios(this.desde)
      .subscribe(servicios => this.servicios = servicios);
  }*/

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
      if(this.contador >= 0 && this.contador<=100){
        this.limiteNombre = true;
      }else{
        this.limiteNombre = false;
      }
      if(this.contador === 100){
        return false;
      }
      if(this.contador === 0){
        return false;
      }
      console.log(this.contador)
        break;

        /**CASE DESCRIPCIÓN */
        case 'descripcion':
        this.contador = event.target.value.length
      if(this.contador > 0 && this.contador<=200){
        this.limiteDescripcion = true;
      }else{
        this.limiteDescripcion = false;
      }
      if(this.contador === 200){
        return false;
      }
      console.log(this.contador)
        break;


      /**CASE DESCRIPCIÓN */
      case 'direccion':
        this.contador = event.target.value.length
      if(this.contador > 0 && this.contador<=150){
        this.limiteDireccion = true;
      }else{
        this.limiteDireccion = false;
      }
      if(this.contador === 150){
        return false;
      }
      console.log(this.contador)
        break;

      }

      /*this.contador = event.target.value.length
      if(this.contador > 0 && this.contador<=100){
        this.limiteNombre = true;
      }else{
        this.limiteNombre = false;
      }
      if(this.contador === 100){
        return false;
      }
      console.log(this.contador)*/
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
