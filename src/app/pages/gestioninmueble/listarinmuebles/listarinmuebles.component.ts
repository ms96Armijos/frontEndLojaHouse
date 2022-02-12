import { SubirfotoinmuebleService } from 'src/app/services/inmueble/subirfotoinmueble.service';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { Contrato } from './../../../models/contrato.model';
import { InmuebleService } from './../../../services/inmueble/inmueble.service';
import { ToastrService } from 'ngx-toastr';
import { Inmueble } from './../../../models/inmueble.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import * as moment from 'moment';


@Component({
  selector: 'app-listarinmuebles',
  templateUrl: './listarinmuebles.component.html',
  styleUrls: ['./listarinmuebles.component.css']
})
export class ListarinmueblesComponent implements OnInit {


  contratos: Contrato[] = [];
  inmuebles: Inmueble[] = [];


  imagenTemporal: string;
  desde = 0;
  contador;

  timer = null;
  time = 1000;

  fechaHoy;
  banderaCrearInmuieble = false;


  constructor( public _contratoService: ContratoService,
    public _inmuebleService: InmuebleService,
    public toastr: ToastrService,
    public subirFotosInmuebleService: SubirfotoinmuebleService ) {

    let now = moment(); // add this 2 of 4
    this.fechaHoy = now.format();
    //console.log('hello world', now.format()); // add this 3 of 4

  }

  ngOnInit(): void {
    this.cargarInmuebles();
    //this.buscarInmuebles('DISPONIBLE');
    this.cargarContratos();

  }

  cargarContratos(){
    this._contratoService.cargarContratos(this.desde)
    .subscribe( contratos => {this.contratos = contratos});
  }


  cargarInmuebles() {
    this._inmuebleService.cargarInmuebles(this.desde)
      .subscribe(inmuebles => {
        this.inmuebles = inmuebles
      });
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


  buscarInmuebles(termino: string) {
clearTimeout(this.timer);

this.timer = setTimeout(() => {
  //console.log(termino);
    if (termino.length <= 0) {
      this.cargarInmuebles();
      return;
    }
    this._inmuebleService.buscarInmuebles(termino)
      .subscribe(inmuebles => this.inmuebles = inmuebles);
    }, this.time);
  }


  borrarInmuebleArrendador( inmueble: Inmueble ){

    swal({
      title: '¿Está seguro de borrar el servicio?',
      text: 'Está a punto de borrar el servicio: ' + inmueble.nombre,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._inmuebleService.borrarInmuebleArrendador(inmueble._id)
            .subscribe(borrado => {
              this.cargarInmuebles();
            });
        }
      });
  }



  publicarInmueble(inmueble: Inmueble) {

    let estadoObtenido: string;

    if (inmueble.publicado === 'PUBLICO') {
      estadoObtenido = 'PRIVADO';
    } else {
      estadoObtenido = 'PÚBLICO';
    }

    swal({
      title: '¿Está seguro de realizar la siguiente acción?',
      text: 'El inmueble estará: ' + estadoObtenido,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar',
      ],
      dangerMode: false,
    }).then(borrar => {
      if (borrar) {
        if (inmueble.publicado === 'PUBLICO') {
          inmueble.publicado = 'PRIVADO';
          inmueble.estado = 'DISPONIBLE';
          this.banderaCrearInmuieble = false;
        } else {
          inmueble.publicado = 'PUBLICO';
          inmueble.estado = 'DISPONIBLE';
          this.banderaCrearInmuieble = true;
        }

        this._inmuebleService.publicarInmueble(inmueble)
          .subscribe(inmuebles =>{
            if(inmuebles.publicado === 'PUBLICO' && this.banderaCrearInmuieble){
              this.enviarFCM(inmuebles._id);
            }
          });
        this.toastr.success('Inmueble ' + estadoObtenido);
      }
    });
  }

  enviarFCM(idInmueble: string){
    this._inmuebleService.enviarNotificacionFCM(idInmueble).subscribe(resp => {});
  }


  estadoDelContrato(contrato: Contrato) {

    let estadoObtenido: string;

    if (contrato.estado === 'VIGENTE') {
      estadoObtenido = 'TERMINADO';
      swal({
        title: '¿Está seguro de realizar la siguiente acción?',
        text: 'El contrato será: ' + estadoObtenido,
        icon: 'warning',
        buttons: [
          'Cancelar',
          'Aceptar'
        ],
        dangerMode: false,
      }).then(borrar => {
        if (borrar) {
          if (contrato.estado === 'VIGENTE') {
            contrato.estado="TERMINADO";
          }
            this._contratoService.cambiarEstadoDelContrato(contrato)
            .subscribe();
          this.toastr.success('Contrato ' + estadoObtenido);
        }
      });
    }else{
      this.toastr.warning('Ya está ' + contrato.estado + ' el contrato');
    }
  }






}
