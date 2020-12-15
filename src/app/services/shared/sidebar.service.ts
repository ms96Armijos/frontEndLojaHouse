import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];

  constructor(public _usuarioService: UsuarioService) { }

  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }
}
