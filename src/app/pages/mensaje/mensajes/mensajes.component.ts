import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnviarmensajeService } from './../../../services/enviarmensaje/enviarmensaje.service';
import { Mensaje } from './../../../models/mensaje.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  mensajes: Mensaje[] = [];
  desde = 0;

  cargando = true;

  timer = null;
  time = 1000;

  constructor(public _enviarMensajeService: EnviarmensajeService,
    public toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {
    this.cargarMensajes();
    this.buscarMensaje('ENVIADO');
  }

  cargarMensajes(){
    this._enviarMensajeService.cargarMensajes(this.desde)
    .subscribe( mensajes => this.mensajes = mensajes);
  }

  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._enviarMensajeService.totalMensajes) {
      this.toastr.error('Solo existen ' + this._enviarMensajeService.totalMensajes + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarMensajes();
    this.buscarMensaje('ENVIADO');
  }

  leerMensaje(mensaje: Mensaje) {

    this._enviarMensajeService.leerMensaje(mensaje)
          .subscribe();
  }



  buscarMensaje(termino: string) {

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(termino);

    if (termino.length <= 0) {
      this.cargarMensajes();
      this.buscarMensaje('ENVIADO');
      return;
    }

    this.cargando = true;

    this._enviarMensajeService.buscarMensajes(termino, this.desde)
      .subscribe((mensajes: Mensaje[]) => {
        this.mensajes = mensajes;
        this.cargando = false;
      });
    }, this.time);
  }

  borrarMensaje(mensaje: Mensaje) {
    swal({
      title: '¿Está seguro de borrar el mensaje?',
      text: 'Está a punto de borrar a: ' + mensaje.titulo,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Eliminar'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {
          mensaje.estado = 'ELIMINADO';
          this._enviarMensajeService.borrarMensaje(mensaje)
            .subscribe(borrado => {
              this.cargarMensajes();
              this.buscarMensaje('ENVIADO');
            });
        }
      });
  }
}
