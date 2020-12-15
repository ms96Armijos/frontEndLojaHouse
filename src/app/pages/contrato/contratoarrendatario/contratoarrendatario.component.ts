import { Contrato } from './../../../models/contrato.model';
import { ContratoService } from './../../../services/contrato/contrato.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contratoarrendatario',
  templateUrl: './contratoarrendatario.component.html',
  styleUrls: ['./contratoarrendatario.component.css']
})
export class ContratoarrendatarioComponent implements OnInit {

  contratos: Contrato[] = [];
  desde = 0;
  //urlActual;

  constructor( public _contratoService: ContratoService, public toastr: ToastrService, public router: Router ) { }

  ngOnInit(): void {

   /* this.urlActual = document.location.href;

    const separoLaCadena = this.urlActual.split('/');
    const obtengoSoloElNombre  = separoLaCadena[separoLaCadena.length - 1]
    console.log('url: ' + obtengoSoloElNombre);

    if(obtengoSoloElNombre === 'arrendatario-contratos'){
      this.cargarContratosArrendatarioAdministrador();
    }*/

    this.cargarContratos();
  }

  cargarContratos() {
    this._contratoService.cargarContratosArrendatario(this.desde)
      .subscribe(contratos => { this.contratos = contratos });
  }


  /*cargarContratosArrendatarioAdministrador() {
    this._contratoService.cargarContratosArrendatarioAdministrador(this.desde)
      .subscribe(contratos => { this.contratos = contratos });
  }*/

  buscarContratos(termino: string) {


    if (termino.length <= 0) {
      this.cargarContratos();
      return;
    }
    console.log(termino)
    this._contratoService.buscarContratosArrendatario(termino)
      .subscribe(contratosarrendatario => this.contratos = contratosarrendatario);

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
    this.cargarContratos();
  }

}
