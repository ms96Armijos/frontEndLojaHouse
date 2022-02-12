import { UsuarioService } from './../../services/usuario/usuario.service';
import { SidebarService } from './../../services/shared/sidebar.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import swal from 'sweetalert';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario: Usuario = new Usuario(null, null, null, null, null);
  fotoPerfil = '';

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
      for (let i = 0; i < usuarioObtenido['imagen'].length; i++) {
        this.fotoPerfil = usuarioObtenido['imagen'][i]['url']
      }
     //console.log('visita: '+this.visitas.inmueble.nombre );
    });
  }

  encuesta(){
    swal({
      title: 'Encuesta',
      text: 'Por favor conteste la presente encuesta luego de haber interactuado con la aplicación LojaHouse, ¡Gracias!',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Realizar Encuesta'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {

          window.open('https://forms.gle/PU5mDSd3cBp5NHWh8');
        }
      });
  }

  encuestaArrendatario(){
    swal({
      title: 'Encuesta de Usabilidad',
      text: 'Por favor conteste la presente encuesta luego de haber interactuado con la aplicación LojaHouse, ¡Gracias!',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Realizar Encuesta'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {

          window.open('https://forms.gle/PU5mDSd3cBp5NHWh8');
        }
      });
  }

  encuestaArrendatarioMovil(){
    swal({
      title: 'Encuesta de Aceptación',
      text: 'Por favor conteste la presente encuesta de aceptación de la aplicación LojaHouse, ¡Gracias!',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Realizar Encuesta'
      ],
      dangerMode: true,
    })
      .then(borrar => {
        if (borrar) {

          window.open('https://forms.gle/5goexuV14SACtibc8');
        }
      });
  }

}
