import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { Inmueble } from './../../../../models/inmueble.model';
import { ToastrService } from 'ngx-toastr';
import { ContratoService } from './../../../../services/contrato/contrato.service';
import { Contrato } from './../../../../models/contrato.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import * as moment from 'moment';

@Component({
  selector: 'app-admincontratos',
  templateUrl: './admincontratos.component.html',
  styleUrls: ['./admincontratos.component.css']
})
export class AdmincontratosComponent implements OnInit {

  contratos: Contrato[] = [];
  desde = 0;
  idUsuario: string;
  inmuebles: Inmueble[] = [];

  timer = null;
  time = 1000;

  fechaHoy;


  constructor( public _contratoService: ContratoService,
               public _inmuebleService: InmuebleService,
               public toastr: ToastrService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
                let now = moment(); // add this 2 of 4
                this.fechaHoy = now.format();

                activatedRoute.params.subscribe(parametros => {
                  this.idUsuario = parametros['idusuario'];
                  console.log(this.idUsuario);
                });
               }

  ngOnInit(): void {
    this.cargarContratosAdminArrendador();
    this.cargarInmueblesAdminArrendador();
  }

  cargarContratosAdminArrendador(){
    this._contratoService.cargarContratosAdminArrendador(this.desde, this.idUsuario)
    .subscribe( contratos => {this.contratos = contratos});
  }

  cargarInmueblesAdminArrendador() {
    this._inmuebleService.cargarInmueblesAdminArrendador(this.desde, this.idUsuario)
      .subscribe(inmuebles => {this.inmuebles = inmuebles
      console.log(inmuebles)});

  }


  buscarContratos(termino: string){

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(termino);

    if ( termino.length <= 0 ){
      this.cargarContratosAdminArrendador();
      return;
    }
    this._contratoService.adminBuscarContratosArrendador( termino, this.idUsuario, this.desde )
    .subscribe( contratos => this.contratos = contratos);
    }, this.time);
  }

  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._contratoService.totalContratos) {
      this.toastr.error('Solo existen ' + this._contratoService.totalContratos + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarContratosAdminArrendador();
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
        dangerMode: true,
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

  publicarInmueble(inmueble: Inmueble){

      for (let i = 0; i < this.contratos.length; i++) {
        if(inmueble._id === this.contratos[i].inmueble._id){
          inmueble.publicado == "PUBLICO";
          inmueble.estado = "DISPONIBLE";
        }
      }
      this._inmuebleService.publicarInmueble(inmueble)
      .subscribe();
      this.toastr.success('El inmueble ' + inmueble.nombre + ' ha sido publicado');
  }

  regresarPagina(){
    window.history.back();
  }

}
