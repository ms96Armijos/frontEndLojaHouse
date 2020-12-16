import { ToastrService } from 'ngx-toastr';
import { ContratoService } from './../../../../services/contrato/contrato.service';
import { Contrato } from './../../../../models/contrato.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admincontratos',
  templateUrl: './admincontratos.component.html',
  styleUrls: ['./admincontratos.component.css']
})
export class AdmincontratosComponent implements OnInit {

  contratos: Contrato[] = [];
  desde = 0;
  idUsuario: string;

  timer = null;
  time = 1000;


  constructor( public _contratoService: ContratoService,
               public toastr: ToastrService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {

                activatedRoute.params.subscribe(parametros => {
                  this.idUsuario = parametros['idusuario'];
                  console.log(this.idUsuario);
                });
               }

  ngOnInit(): void {
    this.cargarContratosAdminArrendador();
  }

  cargarContratosAdminArrendador(){
    this._contratoService.cargarContratosAdminArrendador(this.desde, this.idUsuario)
    .subscribe( contratos => {this.contratos = contratos});
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

}
