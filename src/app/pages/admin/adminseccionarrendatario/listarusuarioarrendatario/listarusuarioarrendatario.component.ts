import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../../services/usuario/usuario.service';
import { Usuario } from './../../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';


@Component({
  selector: 'app-listarusuarioarrendatario',
  templateUrl: './listarusuarioarrendatario.component.html',
  styleUrls: ['./listarusuarioarrendatario.component.css']
})
export class ListarusuarioarrendatarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalDeRegistros = 0;
  cargando = true;

  rol = 'ARRENDATARIO';

  timer = null;
  time = 2000;



  constructor( public _usuarioService: UsuarioService, public toastr: ToastrService ) { }

  ngOnInit(): void {
    //this.buscarUsuario('1');
    this.cargarUsuariosAdminArrendadorArrendatario();
  }

  cargarUsuariosAdminArrendadorArrendatario() {
  this.cargando = true;
    this._usuarioService.cargarUsuariosAdminArrendadorArrendatario(this.desde, this.rol)
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
    this.cargarUsuariosAdminArrendadorArrendatario();
  }

  buscarUsuario(termino: string) {

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(termino);

    if (termino.length <= 0) {
      this.cargarUsuariosAdminArrendadorArrendatario();
      return;
    }

    this.cargando = true;

    this._usuarioService.adminBuscarArrendatarios(termino, this.desde)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
    }, this.time);
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
        this.buscarUsuario(usuario.estado);
        this._usuarioService.desactivarUsuario(usuario)
          .subscribe();
        this.toastr.success('Usuario ' + estadoObtenido);
      }
    });
  }

}
