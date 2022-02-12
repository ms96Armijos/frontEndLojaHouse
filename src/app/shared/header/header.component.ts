import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

declare function inicializarPluginsSidebar();
declare function importarSCCC();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario = new Usuario(null, null, null, null, null);
  fotoPerfil = '';

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    inicializarPluginsSidebar();
    importarSCCC();

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    this.obtenerUsuario(tokenPayload.usuario._id);

  }

  obtenerUsuario(id: string){
    this._usuarioService.obtenerUsuario( id )
    .subscribe( usuarioObtenido => {

      this.usuario = usuarioObtenido;

      for (let i = 0; i < usuarioObtenido['imagen'].length; i++) {
        this.fotoPerfil = usuarioObtenido['imagen'][i]['url']
      }
     //console.log('visita: '+this.visitas.inmueble.nombre );
    });
  }

}
