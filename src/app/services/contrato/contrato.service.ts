import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Contrato } from './../../models/contrato.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  contrato: Contrato;
  totalContratos = 0;

  constructor( public router: Router, public http: HttpClient, public _usuarioService: UsuarioService ) { }

  crearContrato(contrato: Contrato) {
    const url = URL_SERVICIOS + '/contrato/crearcontrato' + '?token=' + this._usuarioService.token;

    return this.http.post(url, contrato).pipe(
      map((resp: any) => {
        swal(
          '¡Genial!',
          'Tu contrato ha sido creado\n',
          'success'
        );
        this.router.navigate(['/plantillacontrato', resp.contrato._id]);
        return true;
      }),
      catchError((err) => {
        swal('Uppss...', err.error.mensaje,'error');
        return throwError(err.error.mensaje);
      })
    );
  }

  cargarContratos(desde: number = 0) {
    let url = URL_SERVICIOS + '/contrato/obtenercontratos/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalContratos = resp.total;
        this.contrato = resp.contratos;
        return resp.contratos;
      })
    );
  }

  cargarContratosArrendatario(desde: number = 0) {
    let url = URL_SERVICIOS + '/contrato/arrendatario/obtenercontratos/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalContratos = resp.total;
        this.contrato = resp.contratos;
        return resp.contratos;
      })
    );
  }

  /*cargarContratosArrendatarioAdministrador(desde: number = 0) {
    let url = URL_SERVICIOS + '/contrato/administrador/arrendatario/contratos/' + desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalContratos = resp.total;
        this.contrato = resp.contratos;
        return resp.contratos;
      })
    );
  }*/

  obtenerContrato(id: string) {
    let url = URL_SERVICIOS + '/contrato/obtenercontrato/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(map((resp: any) => resp.contrato));
  }


  borrarContrato(id: string) {
    let url = URL_SERVICIOS + '/contrato/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        swal(
          'Contrato eliminado',
          'Se ha eliminado el contrato',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal(
          'Uppss...' + err.error.mensaje,
          ' No se ha podido eliminar el contrato',
          'error'
        );
        return throwError(err.error.mensaje);
      })
    );
  }

  buscarContratos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/contratos/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.contratos));
  }

  buscarContratosArrendatario(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/contratosarrendatario/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.contratosarrendatario));
  }

  aceptarAcuerdo(contrato: Contrato) {
    let url = URL_SERVICIOS + '/contrato/acuerdo/' + contrato._id + '/aceptar';
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, contrato)
      .pipe(map((resp: any) => resp.contrato));
  }


  cambiarEstadoDelContrato(contrato: Contrato) {
    let url = URL_SERVICIOS + '/contrato/' + contrato._id + '/estado';
    url += '?token=' + this._usuarioService.token;


    return this.http.put(url, contrato)
      .pipe(map((resp: any) => resp.contrato));
  }


//CARGAR CONTRATOS PARA EL ADMIN-ARRENDADOR
  cargarContratosAdminArrendador(desde: number = 0, idUsuario: string) {
    let url = URL_SERVICIOS + '/admin/contrato/obtenercontratos/' + desde + '/' + idUsuario;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalContratos = resp.total;
        this.contrato = resp.contratos;
        return resp.contratos;
      })
    );
  }

  adminBuscarContratosArrendador(termino: string, idUsuario: string, desde: number) {
    let url = URL_SERVICIOS + '/admin/busqueda/coleccion/contratos/' + termino + '/' + idUsuario+'/'+desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.contratos));
  }





  //CARGAR CONTRATOS PARA EL ADMIN-ARRENDATARIO
  cargarContratosAdminArrendatario(desde: number = 0, idUsuario: string) {
    let url = URL_SERVICIOS + '/admin/contrato/arrendatario/obtenercontratos/' + desde + '/' + idUsuario;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalContratos = resp.total;
        this.contrato = resp.contratos;
        return resp.contratos;
      })
    );
  }

  adminBuscarContratosArrendatario(termino: string, idUsuario: string, desde: number) {
    let url = URL_SERVICIOS + '/admin/busqueda/coleccion/arrendatariocontratos/' + termino + '/' + idUsuario+'/'+desde;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.arrendatariocontratos));
  }

}
