import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.component.html',
  styleUrls: ['./verusuarios.component.css']
})
export class VerusuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalDeRegistros = 0;
  cargando = true;
  esAdmin = false;


  constructor( public _usuarioService: UsuarioService, public toastr: ToastrService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalDeRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalDeRegistros) {
      this.toastr.error('Solo existen ' + this.totalDeRegistros + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }


    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarAdminUsuariosArrendatario(termino)
      .subscribe((usuarios: Usuario[]) => {
        console.log(termino);
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  desactivarUsuario(usuario: Usuario) {

    let estadoObtenido: string ;

    if (usuario.estado === '1') {
      estadoObtenido = 'DESACTIVADO';
    }else{
      estadoObtenido = 'ACTIVADO';
    }

    swal({
      title: '¿Está seguro de realizar la siguiente acción?',
      text: 'El usuario será: ' + estadoObtenido,
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    }).then(borrar => {
      if (borrar) {
        if (usuario.estado === '1') {
          usuario.estado = '0';
        } else {
          usuario.estado = '1';
        }

        this._usuarioService.desactivarUsuario(usuario)
          .subscribe();
        this.toastr.success('Usuario ' + estadoObtenido);
      }
    });
  }

}
