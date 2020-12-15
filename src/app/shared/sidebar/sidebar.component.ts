import { UsuarioService } from './../../services/usuario/usuario.service';
import { SidebarService } from './../../services/shared/sidebar.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario: Usuario = new Usuario(null, null, null, null, null);

  constructor( public _sidebar: SidebarService, public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    this.obtenerUsuario(tokenPayload.usuario._id);

    this._sidebar.cargarMenu();

  }

  obtenerUsuario(id: string){
    this._usuarioService.obtenerUsuario( id )
    .subscribe( usuarioObtenido => {

      this.usuario = usuarioObtenido;
     //console.log('visita: '+this.visitas.inmueble.nombre );
    });
  }

}
