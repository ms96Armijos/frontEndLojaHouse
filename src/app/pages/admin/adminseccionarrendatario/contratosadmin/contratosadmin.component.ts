import { ToastrService } from 'ngx-toastr';
import { ContratoService } from './../../../../services/contrato/contrato.service';
import { Contrato } from './../../../../models/contrato.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contratosadmin',
  templateUrl: './contratosadmin.component.html',
  styleUrls: ['./contratosadmin.component.css']
})
export class ContratosadminComponent implements OnInit {

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
    this.cargarContratosAdminArrendatario();
  }

  cargarContratosAdminArrendatario(){
    this._contratoService.cargarContratosAdminArrendatario(this.desde, this.idUsuario)
    .subscribe( contratos => {this.contratos = contratos});
  }

  buscarContratos(termino: string){

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(termino);

    if ( termino.length <= 0 ){
      this.cargarContratosAdminArrendatario();
      return;
    }
    this._contratoService.adminBuscarContratosArrendatario( termino, this.idUsuario, this.desde )
    .subscribe( arrendatariocontratos => this.contratos = arrendatariocontratos);
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
    this.cargarContratosAdminArrendatario();
  }

}
