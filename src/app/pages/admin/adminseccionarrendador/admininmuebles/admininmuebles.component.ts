import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { ToastrService } from 'ngx-toastr';
import { Inmueble } from './../../../../models/inmueble.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-admininmuebles',
  templateUrl: './admininmuebles.component.html',
  styleUrls: ['./admininmuebles.component.css']
})
export class AdmininmueblesComponent implements OnInit {

  idUsuario: string;

  inmuebles: Inmueble[] = [];
  imagenTemporal: string;
  desde = 0;
  contador: string [] = [];


  constructor( public _inmuebleService: InmuebleService, public toastr: ToastrService, public activatedRoute: ActivatedRoute ) {

    activatedRoute.params.subscribe(parametros => {
      this.idUsuario = parametros['idusuario'];
      console.log(this.idUsuario)
      //this.obtenerVisita(id);
      //this.obtenerUsuarioArrendador(this.tokenPayload.usuario._id);
    });
  }

  ngOnInit(): void {
    this.cargarInmueblesAdminArrendador();
  }

  cargarInmueblesAdminArrendador() {
    this._inmuebleService.cargarInmueblesAdminArrendador(this.desde, this.idUsuario)
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
    this.cargarInmueblesAdminArrendador();
  }

  buscarInmuebles(termino: string) {

    if (termino.length <= 0) {
      this.cargarInmueblesAdminArrendador();
      return;
    }
    this._inmuebleService.adminBuscarInmueblesArrendador(termino, this.idUsuario, this.desde)
      .subscribe(inmuebles => this.inmuebles = inmuebles);

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
              this.cargarInmueblesAdminArrendador();
            });
        }
      });

  }

}