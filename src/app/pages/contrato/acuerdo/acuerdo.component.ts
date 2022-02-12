import { ToastrService } from 'ngx-toastr';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-acuerdo',
  templateUrl: './acuerdo.component.html',
  styleUrls: ['./acuerdo.component.css']
})
export class AcuerdoComponent implements OnInit {

  idContrato;
  contrato: Contrato = new Contrato(null, null, null, null, null, null);

  constructor(public _contratoService: ContratoService, public toastr: ToastrService, public activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(parametros => {
      this.idContrato = parametros['idcontrato'];
      //console.log(this.idContrato);
    });

  }

  ngOnInit(): void {
    this.obtenerContrato(this.idContrato);
  }

  obtenerContrato(id: string) {
    this._contratoService.obtenerContrato(id)
      .subscribe(contrato => {
        this.contrato = contrato;
        //console.log(this.inmuebles);

      });
  }

  aceptarAcuerdo(contrato: Contrato) {

    let estadoObtenido: string;

    if (contrato.acuerdo === 'PENDIENTE' || contrato.acuerdo === 'RECHAZADA') {
      estadoObtenido = 'ACEPTADO';
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
          if (contrato.acuerdo === 'PENDIENTE' || contrato.acuerdo === 'RECHAZADA') {
            contrato.acuerdo = 'ACEPTADO';
            contrato.estado="VIGENTE";
          }

          this._contratoService.aceptarAcuerdo(contrato)
            .subscribe();
          this.toastr.success('Contrato ' + estadoObtenido);
        }
      });
    }else{
      this.toastr.warning('Ya está ' + contrato.acuerdo + ' el contrato');
    }
  }
  regresarPagina(){
    window.history.back();
  }

}
