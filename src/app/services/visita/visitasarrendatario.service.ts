import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Visita } from './../../models/visita.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitasarrendatarioService {

  visita: Visita;
  totalSolicitudVisitas = 0;


  constructor( public http: HttpClient, public _usuarioService: UsuarioService ) { }


  cargarVisitasArrendatario(desde: number = 0) {
    let url = URL_SERVICIOS + '/visita/arrendatario/visitasolicitada/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalSolicitudVisitas = resp.total;
        this.visita = resp.visitas;
        return resp.visitas;
      })
    );
  }

  cargarVisitasArrendatarioAdministrador(desde: number = 0, idArrendatario: string) {
    let url = URL_SERVICIOS + '/admin/visita/arrendatario/obtenervisitas/' + desde + '/' + idArrendatario;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalSolicitudVisitas = resp.total;
        this.visita = resp.visitas;
        return resp.visitas;
      })
    );
  }

  buscarVisitasArrendatario(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/visitasarrendatario/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.visitasarrendatario));
  }

  obtenerUnaVisitaArrendatario(id: string) {
    let url = URL_SERVICIOS + '/visita/arrendatario/obtenervisita/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(map((resp: any) => resp.visita));
  }
}
