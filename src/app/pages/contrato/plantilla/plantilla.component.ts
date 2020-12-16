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

  constructor( public _contratoService: ContratoService,
    public router: Router, public activatedRoute: ActivatedRoute ) {

      activatedRoute.params.subscribe(parametros => {
        const id = parametros['idcontrato'];
        this.obtenerContrato(id);
      });
    }

  ngOnInit(): void {
  }

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
    const pdf = new jsPDF('p', 'pt', [630, 900]);
    pdf.fromHTML(informacion, 20, 10, { maxWidth: 150, align: 'justify' });
    pdf.output('dataurlnewwindow');
  }


  public exportarPDF() {
    const referencia = this.htmlData.nativeElement;
    const pdf = new jsPDF('p', 'pt', [630, 900]);
    pdf.fromHTML(referencia, 20, 10, { maxWidth: 150, align: 'justify' });
    pdf.save("ContratoLojaHouse.pdf");
  }

}
