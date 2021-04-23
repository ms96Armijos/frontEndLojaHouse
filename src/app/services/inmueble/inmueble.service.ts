import { Inmueble } from './../../models/inmueble.model';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  totalInmuebles: number = 0;


  constructor( public http: HttpClient, public _usuarioService: UsuarioService ) { }

  cargarInmuebles(desde: number = 0) {
    let url = URL_SERVICIOS + '/inmueble/obtenerinmuebles/arrendador/' + desde;
      url += '?token=' + this._usuarioService.token;


    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalInmuebles = resp.total;
        return resp.inmuebles;
      })
    );
  }

  obtenerInmueble(id: string) {
    let url = URL_SERVICIOS + '/inmueble/obtenerinmueble/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(map((resp: any) => resp.inmueble));
  }


  obtenerInmueblePublico(id: string) {
    let url = URL_SERVICIOS + '/inmueble/obtenerinmueble/publico/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.inmueble));
  }


  borrarInmueble(inmueble: Inmueble) {
    let url = URL_SERVICIOS + '/inmueble/eliminarinmueble/' + inmueble._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, inmueble).pipe(
      map((resp: any) => {
        swal(
          'Inmueble eliminado',
          'Se ha eliminado el bien inmueble',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal(
          'Uppss...' + err.error.mensaje,
          ' No se ha podido eliminar el inmuebele',
          'error'
        );
        return throwError(err.error.mensaje);
      })
    );
  }

  borrarInmuebleDesdeElAdministrador(inmueble: Inmueble) {
    let url = URL_SERVICIOS + '/inmueble/eliminar-inmueble/admin/' + inmueble._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, inmueble).pipe(
      map((resp: any) => {
        swal(
          'Inmueble eliminado',
          'Se ha eliminado el bien inmueble',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal(
          'Uppss...' + err.error.mensaje,
          ' No se ha podido eliminar el inmuebele',
          'error'
        );
        return throwError(err.error.mensaje);
      })
    );
  }

  crearInmueble(inmueble: Inmueble) {
    let url = URL_SERVICIOS + '/inmueble';

    if (inmueble._id) {
      url += '/actualizarinmueble/' + inmueble._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, inmueble)
        .pipe(map((resp: any) => {
          swal(
            'Inmueble actualizado!!',
            'Se ha actualizado su inmueble',
            'success'
          );
          return resp.inmueble;
        }),
          catchError((err) => {
            swal('Uppss...' + err.error.mensaje, ' Existen campos obligatorios vacíos', 'error');
            return throwError(err.error.mensaje);
          }));

    } else {
      url += '/crearinmueble?token=' + this._usuarioService.token;

      return this.http.post(url, inmueble)
        .pipe(
          map((resp: any) => {
            swal(
              'Inmueble registrado!!',
              'Se ha registrado su bien inmueble',
              'success'
            );
            return resp.inmueble;
          }),
          catchError((err) => {
            swal('Uppss...' + err.error.errors, ' Existen campos obligatorios vacíos', 'error');
            return throwError(err.error.mensaje);
          })
        );
    }

  }

  buscarInmuebles(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/inmuebles/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.inmuebles));
  }

  busquedaAnidadaInmuebles(tipo: string, ubicacion: string, precio: String) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/inmuebles/' + tipo + '/' + ubicacion +'/' + precio;
    console.log(url)
    return this.http.get(url)
      .pipe(map((resp: any) => resp.inmuebles));
  }

  publicarInmueble(inmueble: Inmueble) {
    let url = URL_SERVICIOS + '/inmueble/desactivarinmueble/' + inmueble._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, inmueble)
      .pipe(map((resp: any) => {
        resp.inmueble;
        return resp.inmueble;
      }));
  }


  cargarInmueblesPulicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/inmueble/inmueblespublicos/' + desde;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalInmuebles = resp.total;
        return resp.inmuebles;
      })
    );
  }


  cargarInmueblesPublicados(desde: number = 0) {
    let url = URL_SERVICIOS + '/inmueble/publicados/arrendador/' + desde;
      url += '?token=' + this._usuarioService.token;


    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalInmuebles = resp.total;
        return resp.inmuebles;
      })
    );
  }



  //SECCIÓN ADMINISTRADOR-ARRENDADOR
  cargarInmueblesAdminArrendador(desde: number = 0, idArrendador: string) {
    let url = URL_SERVICIOS + '/admin/inmueble/arrendador/obtener/inmuebles/' + desde + '/' + idArrendador;
      url += '?token=' + this._usuarioService.token;


    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalInmuebles = resp.total;
        return resp.inmuebles;
      })
    );
  }

  adminBuscarInmueblesArrendador(termino: string, idUsuario: string, desde: number) {
    let url = URL_SERVICIOS + '/admin/busqueda/coleccion/inmuebles/' + termino + '/' + idUsuario+'/'+desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.inmuebles));
  }


  enviarNotificacionFCM(inmueble: string) {
    console.log('push')
    let url = URL_SERVICIOS + '/enviarnotificaciones/notificacion-usuario/'+ inmueble;
    return this.http.get(url).pipe(map((resp: any) => resp.ok));
  }



}
