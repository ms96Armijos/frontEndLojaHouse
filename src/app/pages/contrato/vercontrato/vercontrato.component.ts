import { Inmueble } from './../../../models/inmueble.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InmuebleService } from './../../../services/inmueble/inmueble.service';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { Contrato } from 'src/app/models/contrato.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import * as moment from 'moment';

declare function inicializarPluginsSidebar()

@Component({
  selector: 'app-vercontrato',
  templateUrl: './vercontrato.component.html',
  styleUrls: ['./vercontrato.component.css']
})
export class VercontratoComponent implements OnInit {

  idContrato;
  contrato: Contrato = new Contrato(null, null, null, null);
  inmueble: Inmueble = new Inmueble(null, null, null, null, null, null, null, null, null);

  timer = null;
  time = 1000;
  fechaHoy;

  constructor(public _contratoService: ContratoService,
    public _inmuebleService: InmuebleService,
    public toastr: ToastrService,
    public router: Router,
    public activatedRoute: ActivatedRoute, ) {
      activatedRoute.params.subscribe(parametros => {
        this.idContrato = parametros['idcontrato'];
        let now = moment(); // add this 2 of 4
        this.fechaHoy = now.format();

      });
    }

  ngOnInit(): void {
    inicializarPluginsSidebar();
    this.obtenerContrato(this.idContrato);

  }

  obtenerInmueble(id: string){
    this._inmuebleService.obtenerInmueble( id )
    .subscribe( inmuebleObtenido => {
      this.inmueble = inmuebleObtenido;
      //console.log(this.inmueble)
    });
  }


  obtenerContrato(id: string){
    this._contratoService.obtenerContrato( id )
    .subscribe( contratoObtenido => {
      this.contrato = contratoObtenido;
      this.obtenerInmueble(contratoObtenido.inmueble._id);
      /*var momentB = moment(this.contrato.fechafin,"YYYY/MM/DD");
      if(momentB > this.fechaHoy){

        console.log('TRUE '+ momentB.add(1, 'months').format("YYYY/MM/DD"))
      }else{
        console.log('FALSE '+ this.fechaHoy)
      }*/

    });
  }

  estadoDelContrato(contrato: Contrato) {

    let estadoObtenido: string;

    if (contrato.estado === 'VIGENTE') {
      estadoObtenido = 'TERMINADO';
      swal({
        title: '¿Está seguro de realizar la siguiente acción?',
        text: 'El contrato será ' + estadoObtenido,
        icon: 'warning',
        buttons: [
          'Cancelar',
          'Aceptar'
        ],
        dangerMode: false,
      }).then(borrar => {
        if (borrar) {

          if(contrato.fechafin > this.fechaHoy){

            swal({
              title: '¡¡¡Atención!!! \n El contrato finaliza el: '+ moment(contrato.fechafin).format("DD/MM/YYYY"),
              text: 'Recuerde: El contrato será terminado antes de tiempo, ¿Desea continuar?',
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

            if (contrato.estado === 'VIGENTE') {
              contrato.estado="TERMINADO";
            }

            this._contratoService.cambiarEstadoDelContrato(contrato)
                  .subscribe();
                this.toastr.success('Contrato ' + estadoObtenido);
          }





        }
      });
    }else{
      this.toastr.warning('Ya está ' + contrato.estado + ' el contrato');
    }
  }

  publicarInmueble(inmueble: Inmueble){



    swal({
      title: '¿Está seguro de realizar la siguiente acción?',
      text: 'El inmueble estará: DISPONIBLE',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: false,
    }).then(borrar => {
      if (borrar) {

        if(inmueble.estado !== "ELIMINADO"){
          if(this.contrato.estado === 'TERMINADO'){
            inmueble.publicado == "PUBLICO";
            inmueble.estado = "DISPONIBLE";
            this._inmuebleService.publicarInmueble(inmueble)
          .subscribe();
          this.toastr.success('El inmueble ' + inmueble.nombre + ' está DISPONIBLE para publicar');
          }else{
            inmueble.publicado == "PRIVADO";
            inmueble.estado = "OCUPADO";
            swal(
              'Lo siento!, el contrato no se ha finalizado',
              'Haga clic en: Terminar el Contrato para continuar',
              'warning'
            );
          }
        }else{
          swal(
            'Lo siento!, no se puede realizar esta acción',
            'No se puede habilitar el inmueble',
            'warning'
          );
        }
      }
    });
}

regresarPagina(){
  window.history.back();
}

}
