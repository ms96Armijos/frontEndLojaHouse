import { ActivatedRoute, Router } from '@angular/router';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { Contrato } from './../../../models/contrato.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styles: []
})
export class PlantillaComponent implements OnInit {

  existeContrato: boolean = false;

  @ViewChild('contratolojahouse') htmlData: ElementRef;

  contratos: Contrato = new Contrato(null, null, null, null, null);

  //fechaParaElAcuerdo: string;

  constructor(public _contratoService: ContratoService,
    public router: Router, public activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(parametros => {
      const id = parametros['idcontrato'];
      this.obtenerContrato(id);
    });
  }

  ngOnInit(): void {

   // this.obtenerFechaActual();
  }


  /*obtenerFechaActual() {
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    var f = new Date();
    this.fechaParaElAcuerdo = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  }*/

  obtenerContrato(id: string) {
    this._contratoService.obtenerContrato(id)
      .subscribe(contrato => {
        //console.log(contrato);
        this.contratos = contrato;
        this.existeContrato = true;
      });
  }

  public openPDF() {

    const informacion = this.htmlData.nativeElement;
    const pdf = new jsPDF('p', 'pt', [595.28, 841.89]);

    let img = new Image();
    img.src = 'assets/images/logo-icon.png';
    pdf.addImage(img, 'png', 20, 10, 50, 50);


    pdf.fromHTML(informacion, 25, 10, {width: 550  });
    pdf.output('dataurlnewwindow');
  }


  public exportarPDF() {
    const referencia = this.htmlData.nativeElement;
    const pdf = new jsPDF('p', 'pt', [595.28, 841.89]);
    pdf.fromHTML(referencia, 20, 10, { maxWidth: 200, align: 'justify', left: 1,
    right: 1});
    pdf.save(this.contratos.nombrecontrato + ".pdf");
  }

  regresarPagina(){
    window.history.back();
  }

}
