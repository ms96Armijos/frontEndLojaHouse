import { ToastrService } from 'ngx-toastr';
import { VisitaService } from './../../../../services/visita/visita.service';
import { Visita } from './../../../../models/visita.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-vervisita',
  templateUrl: './vervisita.component.html',
  styleUrls: ['./vervisita.component.css']
})
export class VervisitaComponent implements OnInit {

  idVisita;
  visita: Visita = new Visita(null, null, null, null);

  constructor(public _serviceVisita: VisitaService, public activatedRoute: ActivatedRoute, public toastr: ToastrService) {
    activatedRoute.params.subscribe(parametros => {
      this.idVisita = parametros['idvisita'];
    });
  }

  ngOnInit(): void {
    this.obtenerVisita(this.idVisita);
  }

  obtenerVisita(id: string){
    this._serviceVisita.obtenerVisita( id )
    .subscribe( visitaObtenida => {

      this.visita = visitaObtenida;
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
            });
        }
      });

  }

}
