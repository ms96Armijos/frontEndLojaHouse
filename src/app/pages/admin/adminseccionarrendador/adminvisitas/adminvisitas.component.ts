import { Visita } from './../../../../models/visita.model';
import { ToastrService } from 'ngx-toastr';
import { VisitaService } from './../../../../services/visita/visita.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-adminvisitas',
  templateUrl: './adminvisitas.component.html',
  styleUrls: ['./adminvisitas.component.css']
})
export class AdminvisitasComponent implements OnInit {

  visitas: Visita[] = [];
  desde = 0;
  idUsuarioArrendador;


  constructor( public _serviceVisita: VisitaService,
    public toastr: ToastrService, public router: Router, public activatedRoute: ActivatedRoute ) {

      activatedRoute.params.subscribe(parametros => {
        this.idUsuarioArrendador = parametros['idusuario'];
        console.log(this.idUsuarioArrendador);
      });
    }

  ngOnInit(): void {
    this.cargarVisitasAdminArrendador();
  }

  cargarVisitasAdminArrendador() {
    this._serviceVisita.cargarVisitasAdminArrendador(this.desde, this.idUsuarioArrendador)
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
    this.cargarVisitasAdminArrendador();
  }

  buscarVisitas(termino: string) {


    if (termino.length <= 0) {
      this.cargarVisitasAdminArrendador();
      return;
    }
    this._serviceVisita.buscarAdminVisitasSeccionArrendador(termino, this.idUsuarioArrendador, this.desde)
      .subscribe((visitas: Visita[]) => {
        console.log(termino);
        this.visitas = visitas;
      });

  }

  aceptarVisita(visita: Visita) {

    let estadoObtenido: string;

    if (visita.estado === 'PENDIENTE' || visita.estado === 'RECHAZADA') {
      estadoObtenido = 'ACEPTADA';
      swal({
        title: '¿Está seguro de realizar la siguiente acción?',
        text: 'La visita será: ' + estadoObtenido,
        icon: 'warning',
        buttons: [
          'Cancelar',
          'Aceptar'
        ],
        dangerMode: true,
      }).then(borrar => {
        if (borrar) {
          if (visita.estado === 'PENDIENTE' || visita.estado === 'RECHAZADA') {
            visita.estado = 'ACEPTADA';
          }

          this._serviceVisita.aceptarVisita(visita)
            .subscribe();
          this.toastr.success('Visita ' + estadoObtenido);
        }
      });
    }else{
      this.toastr.warning('Ya está ' + visita.estado + ' la visita');
    }
  }

  rechazarVisita(visita: Visita) {

    let estadoObtenido: string;

    if (visita.estado === 'ACEPTADA' || visita.estado === 'PENDIENTE' ) {
      estadoObtenido = 'RECHAZADA';

      swal({
        title: '¿Está seguro de realizar la siguiente acción?',
        text: 'La visita será: ' + estadoObtenido,
        icon: 'warning',
        buttons: [
          'Cancelar',
          'Aceptar'
        ],
        dangerMode: true,
      }).then(borrar => {
        if (borrar) {
          if (visita.estado === 'ACEPTADA' || visita.estado === 'PENDIENTE') {
            visita.estado = 'RECHAZADA';
          }

          this._serviceVisita.aceptarVisita(visita)
            .subscribe();
          this.toastr.success('Visita ' + estadoObtenido);
        }
      });
    }else{
      this.toastr.warning('Ya está ' + visita.estado + ' la visita');
    }
  }

  borrarVisita( visita: Visita ){

    swal({
      title: '¿Está seguro de borrar la visita?',
      text: 'Está a punto de borrar la visita ',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          this._serviceVisita.borrarVisita(visita._id)
            .subscribe(borrado => {
              this.cargarVisitasAdminArrendador();
            });
        }
      });

  }

}