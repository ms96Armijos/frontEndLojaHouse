import { InmuebleService } from './../../../services/inmueble/inmueble.service';
import { ToastrService } from 'ngx-toastr';
import { Inmueble } from './../../../models/inmueble.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-listarinmuebles',
  templateUrl: './listarinmuebles.component.html',
  styleUrls: ['./listarinmuebles.component.css']
})
export class ListarinmueblesComponent implements OnInit {


  inmuebles: Inmueble[] = [];
  imagenTemporal: string;
  desde = 0;
  contador: string [] = [];

  constructor( public _inmuebleService: InmuebleService, public toastr: ToastrService ) {

  }

  ngOnInit(): void {
    this.cargarInmuebles();
  }


  cargarInmuebles() {
    this._inmuebleService.cargarInmuebles(this.desde)
      .subscribe(inmuebles => this.inmuebles = inmuebles);

  }

  cambiarPaginacion(valor: number) {
    const desde: number = this.desde + valor;

    if (desde >= this._inmuebleService.totalInmuebles) {
      this.toastr.error('Solo existen ' + this._inmuebleService.totalInmuebles + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }


    this.desde += valor;
    this.cargarInmuebles();
  }


  buscarInmuebles(termino: string) {

    console.log(termino)
    if (termino.length <= 0) {
      this.cargarInmuebles();
      return;
    }
    this._inmuebleService.buscarInmuebles(termino)
      .subscribe(inmuebles => this.inmuebles = inmuebles);

  }

  borrarInmueble(inmueble: Inmueble) {

    swal({
      title: '¿Está seguro de borrar el inmueble?',
      text: 'Está a punto de borrar a: ' + inmueble.nombre,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          inmueble.estado = 'ELIMINADO';
          this._inmuebleService.borrarInmueble(inmueble)
            .subscribe(borrado => {
              this.cargarInmuebles();
            });
        }
      });

  }


  publicarInmueble(inmueble: Inmueble) {

    let estadoObtenido: string;

    if (inmueble.publicado === 'PUBLICO') {
      estadoObtenido = 'PRIVADO';
    } else {
      estadoObtenido = 'PÚBLICO';
    }

    swal({
      title: '¿Está seguro de realizar la siguiente acción?',
      text: 'El inmueble estará: ' + estadoObtenido,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        if (inmueble.publicado === 'PUBLICO') {
          inmueble.publicado = 'PRIVADO';
          inmueble.estado = 'DISPONIBLE';
        } else {
          inmueble.publicado = 'PUBLICO';
          inmueble.estado = 'DISPONIBLE';
        }

        this._inmuebleService.publicarInmueble(inmueble)
          .subscribe();
        this.toastr.success('Inmueble ' + estadoObtenido);
      }
    });
  }

}
