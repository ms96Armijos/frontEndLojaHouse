import { ToastrService } from 'ngx-toastr';
import { VisitaService } from './../../../../services/visita/visita.service';
import { Visita } from './../../../../models/visita.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visitasadmin',
  templateUrl: './visitasadmin.component.html',
  styleUrls: ['./visitasadmin.component.css']
})
export class VisitasadminComponent implements OnInit {

  visitas: Visita[] = [];
  desde = 0;
  idUsuarioArrendatario;

  constructor( public _serviceVisita: VisitaService,
    public toastr: ToastrService, public router: Router, public activatedRoute: ActivatedRoute ) {

      activatedRoute.params.subscribe(parametros => {
        this.idUsuarioArrendatario = parametros['idusuario'];
        console.log(this.idUsuarioArrendatario);
      });

    }

  ngOnInit(): void {
    this.cargarVisitasAdminArrendatario();
  }

  cargarVisitasAdminArrendatario() {
    this._serviceVisita.cargarVisitasAdminArrendatario(this.desde, this.idUsuarioArrendatario)
      .subscribe(visita => this.visitas = visita);
  }


  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._serviceVisita.totalVisitas) {
      this.toastr.error('Solo existen ' + this._serviceVisita.totalVisitas + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarVisitasAdminArrendatario();
  }

  buscarVisitas(termino: string) {


    if (termino.length <= 0) {
      this.cargarVisitasAdminArrendatario();
      return;
    }
    this._serviceVisita.buscarAdminVisitasSeccionArrendatario(termino, this.idUsuarioArrendatario,this.desde)
      .subscribe((visitas: Visita[]) => {
        console.log(termino);
        this.visitas = visitas;
      });

  }



}
