import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../../config/config';
import { Mensaje } from './../../models/mensaje.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnviarmensajeService {

  mensaje: Mensaje;
  totalMensajes = 0;


  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  crearMensaje(mensaje: Mensaje) {

    let url = URL_SERVICIOS + '/mensaje/crearmensaje';

    //SI NO EXISTE EL ID, CREA UNA NUEVA VISITA
    return this.http.post(url, mensaje)
      .pipe(map((resp: any) => {

          swal(
            'mensaje enviado!!',
            'Se ha enviado su mensaje',
            'success'
          );
          return true;
        }),
        catchError((err) => {
          return swal('Uppss...' + '', err.error.mensaje, 'error');
        })
      );
  }

  cargarMensajes(desde: number = 0) {
    let url = URL_SERVICIOS + '/mensaje/obtenermensajes/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMensajes = resp.total;
        this.mensaje = resp.mensajes;
        return resp.mensajes;
      })
    );
  }

  obtenerMensaje(id: string) {
    let url = URL_SERVICIOS + '/mensaje/obtenermensaje/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(map((resp: any) => resp.mensaje));
  }

  /*buscarMensajes(termino: string) {
    let url = URL_SERVICIOS + '/mensaje/coleccion/mensaje/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.visitas));
  }*/

  borrarMensaje(mensaje: Mensaje) {
    let url = URL_SERVICIOS + '/mensaje/eliminarmensaje/' + mensaje._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, mensaje).pipe(
      map((resp: any) => {
        swal(
          'Mensaje eliminado',
          'Se ha eliminado el mensaje',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal(
          'Uppss...' + err.error.mensaje,
          ' No se ha podido eliminar el mensaje',
          'error'
        );
        return throwError(err.error.mensaje);
      })
    );
  }

  leerMensaje(mensaje: Mensaje) {
    let url = URL_SERVICIOS + '/mensaje/leermensaje/' + mensaje._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, mensaje)
      .pipe(map((resp: any) => resp.mensaje));
  }


  buscarMensajes(termino: string, desde: number) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/mensajes/'+termino+'/' + desde;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.mensajes));
  }

}
