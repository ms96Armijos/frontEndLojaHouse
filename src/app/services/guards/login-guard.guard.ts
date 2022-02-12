import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router){}

  canActivate(){

    const token = localStorage.getItem('token');


    if(token === null || token === ''){
      return false;
    }else{

      const tokenPayload = decode(token);

      if (this._usuarioService.estaLogueado()) {
        //console.log(tokenPayload.usuario.rol);
        return true;
      }else{
        this.router.navigate(['/login']);
      return false;
      }
    }

  }
}
