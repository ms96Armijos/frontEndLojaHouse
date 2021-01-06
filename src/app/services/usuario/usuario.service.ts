import { ToastrService } from 'ngx-toastr';
import { URL_SERVICIOS } from './../../config/config';
import { SubirarchivoService } from './../subirarchivo/subirarchivo.service';
import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];


  constructor( public http: HttpClient,
    public router: Router,
    public servicioSubirArchivo: SubirarchivoService,
    public toastr: ToastrService ) {
    this.cargarStorage();
  }

  //VERIFICAR SI EL USAURIO SE HA LOGUEADO EVALUANDO QUE EL TOKEN EXISTA
  estaLogueado() {
    return (this.token.length > 0) ? true : false;
  }

  //INICIALIZANDO AL LOCALSTORAGE
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.menu = [];
    }
  }


  guardarDatosEnStorage(id: string, token: string,  menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
    this.token = token;
    this.menu = menu;
  }

  eliminarStorage() {
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
  }

   //FUNCION PARA SALIR DE LA APLICACION
   logout() {

    swal({
      title: '¿Está seguro de salir de LojaHouse?',
      text: 'Esperamos que regreses pronto',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        this.eliminarStorage();
        this.toastr.success('Hasta luego no olvides visitarnos de nuevo');
        window.location.href = '/principal';
        //this.router.navigate(['/principal']);
      }
    });
  }

  //FUNCION PARA LOGUARSE EN LA APLICACION
  login(usuario: Usuario) {
    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarDatosEnStorage(resp.id, resp.token, resp.menu);
        return true;
      }),
      catchError((err) => {
        swal('Lo siento...', ' ' + err.mensaje, 'error');
        return throwError(err.error.mensaje);
      })
    );
  }


  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/crearusuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal(
          'Tu cuenta ha sido creada\n' + usuario.nombre,
          'Se ha enviado la contraseña a tu correo electrónico',
          'success'
        );
        return true;
      }),
      catchError((err) => {
        swal('Uppss...',  err.error.mensaje, 'error');
        return throwError(err.error.mensaje);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/actualizarusuario/' + usuario._id;
    url += '?token=' + this.token;
    const tokenPayload = decode(this.token);

    return this.http.put(url, usuario).pipe(map((resp: any) => {

      if (usuario._id === tokenPayload.usuario._id) {
        const usuarioDB = resp.usuario;
        this.guardarDatosEnStorage(usuarioDB._id, this.token, this.menu);
        return true;
      }
    }),
      catchError((err) => {
        console.log(err);

        swal('Uppss...', '' + err.mensaje, 'error');
        return throwError('Lo siento, ha ocurrido un error ' + err.message);
      }));
  }

  desactivarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/desactivarusuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .pipe(map((resp: any) => resp.usuario));
  }


  actualizarImagen(archivo: File, id: string) {

    const tokenPayload = decode(this.token);

    console.log(id);
    this.servicioSubirArchivo.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {

        tokenPayload.usuario.imagen = resp.usuario.imagen;
        swal('Imagen actualizada', 'Se ha actualizado su foto de perfil', 'success');
        this.guardarDatosEnStorage(id, this.token, this.menu);
        window.location.href = '/perfil';

      })
      .catch(resp => {
       console.log(resp);
      });

  }


  obtenerUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/obtenerusuario/' + id;
    url += '?token=' + this.token;
    return this.http.get(url).pipe(map((resp: any) => resp.usuario));
  }


  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario/obtenerusuarios/' + desde;
    url += '?token=' + this.token;

    return this.http.get(url);
  }

  adminBuscarArrendadores(termino: string, desde: number) {
    let url = URL_SERVICIOS + '/admin/busqueda/coleccion/arrendador/' + termino+'/ARRENDADOR/'+desde;
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.arrendador));
  }

  adminBuscarArrendatarios(termino: string, desde: number) {
    let url = URL_SERVICIOS + '/admin/busqueda/coleccion/arrendatario/' + termino+'/ARRENDATARIO/'+desde;
    url += '?token=' + this.token;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.arrendatario));
  }


  cambiarPassword(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/cambiarpassword/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(map((resp: any) => {
      swal('Contraseña actualizada', 'Se ha actualizado su contraseña', 'success');
      const usuarioDB = resp.usuario;
      this.guardarDatosEnStorage(usuarioDB._id, this.token, this.menu);
      return true;
    }),
    catchError((err) => {
      swal('Uppss...' + err.error.mensaje, '', 'error');
      return throwError(err.error.mensaje);
    }));
  }

  reseteoDePassword(usuario: string) {
    const url = URL_SERVICIOS + '/usuario/reseteopassword';

    return this.http.put(url, usuario).pipe(map((resp: any) => {
      swal('Contraseña reseteada', 'Se ha enviado la nueva contraseña al correo electrónico: ' + resp.usuario.correo, 'success');
      this.router.navigate(['/login']);
      return true;
    }),
      catchError((err) => {
        swal('Uppss...' + err.error.mensaje, '', 'error');
        return throwError(err.error.mensaje);
      })
    );
  }

  buscarArrendatario(correo: string){
    let url = URL_SERVICIOS + '/usuario/buscarusuario/buscar/' + correo;
    url += '?token=' + this.token;

    return this.http.get(url).pipe(map((resp: any) => resp.usuario),
    catchError((err) => {
     //return swal('Lo siento...' + err.error.mensaje, 'warning');
     return throwError(err.error.mensaje);
    }));
}

//SECCION - ADMINISTRADOR - ARRENDADOR
cargarUsuariosAdminArrendadorArrendatario(desde: number = 0, rol: string) {
  let url = URL_SERVICIOS + '/usuario/obtenerusuarios/roles/' + rol + '/' + desde;
  url += '?token=' + this.token;

  return this.http.get(url);
}

buscarAdminUsuariosArrendatario(termino: string) {
  let url = URL_SERVICIOS + '/admin/busqueda/coleccion/arrendatario/' + termino;
  url += '?token=' + this.token;

  return this.http.get(url)
    .pipe(map((resp: any) => resp.usuarios));
}


}


