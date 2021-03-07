import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Visita } from './../../models/visita.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  visita: Visita;
  totalVisitas = 0;


  constructor( public http: HttpClient, public _usuarioService: UsuarioService ) { }

  crearVisita(visita: Visita) {

    let url = URL_SERVICIOS + '/visita/crearvisita';

    //SI NO EXISTE EL ID, CREA UNA NUEVA VISITA
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, visita)
      .pipe(map((resp: any) => {

          swal(
            'Visita registrada!!',
            'Se ha registrado su visita',
            'success'
          );
          return true;
        }),
        catchError((err) => {
          return swal('Uppss...' + '', err.error.mensaje, 'error');
          //swal('Uppss...' + '', ' La visita: ' + visita + ' ya existe, ingresa uno diferente', 'error');
          //return throwError(err.error.mensaje);
        })
      );
  }

  cargarVisitas(desde: number = 0) {
    let url = URL_SERVICIOS + '/visita/obtenervisitas/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalVisitas = resp.total;
        this.visita = resp.visitas;
        return resp.visitas;
      })
    );
  }




  obtenerVisita(id: string) {
    let url = URL_SERVICIOS + '/visita/arrendador/obtenervisita/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(map((resp: any) => resp.visita));
  }

 /* obtenerVisitaArrendatario(id: string){
    let url = URL_SERVICIOS + '/visitasolicitada/visitas/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(map((resp: any) => resp.visita));
  }*/

  buscarVisitas(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/visitas/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.visitas));
  }

  aceptarVisita(visita: Visita) {
    let url = URL_SERVICIOS + '/visita/arrendador/aceptarvisita/' + visita._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, visita)
      .pipe(map((resp: any) => resp.visita));
  }

  borrarVisita(id: string) {
    let url = URL_SERVICIOS + '/visita/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        swal(
          'Visita eliminado',
          'Se ha eliminado la visita',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal(
          'Uppss...' + err.error.mensaje,
          ' No se ha podido eliminar la visita',
          'error'
        );
        return throwError(err.error.mensaje);
      })
    );
  }


  //ADMINISTRADOR- VISITAS (VISITAS DEL ARRENDADOR)
  cargarVisitasAdminArrendador(desde: number = 0, idArrendador: string) {
    let url = URL_SERVICIOS + '/admin/visita/arrendador/obtenervisitas/' + desde + '/' + idArrendador;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalVisitas = resp.total;
        this.visita = resp.visitas;
        return resp.visitas;
      })
    );
  }

  buscarAdminVisitasSeccionArrendador(termino: string, idUsuario: string, desde: number) {
    let url = URL_SERVICIOS + '/admin/busqueda/coleccion/visitas/' + termino + '/' + idUsuario+'/'+desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.visitas));
  }

  buscarAdminVisitasSeccionArrendatario(termino: string, idUsuario: string, desde: number) {
    let url = URL_SERVICIOS + '/admin/busqueda/coleccion/visitasarrendatario/' + termino + '/' + idUsuario+'/'+desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.visitasarrendatario));
  }

    //ADMINISTRADOR- VISITAS (VISITAS DEL ARRENDATARIO)
    cargarVisitasAdminArrendatario(desde: number = 0, idArrendador: string) {
      let url = URL_SERVICIOS + '/admin/visita/arrendatario/obtenervisitas/' + desde + '/' + idArrendador;
      url += '?token=' + this._usuarioService.token;
      return this.http.get(url).pipe(
        map((resp: any) => {
          this.totalVisitas = resp.total;
          this.visita = resp.visitas;
          return resp.visitas;
        })
      );
    }
}
