import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as swal from 'sweetalert';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  seleccionado: string = '';

  constructor( public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit(): void {
  }

  registrarUsuario(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    if (this.seleccionado === "" ) {
      swal.default('¡Importante!', 'Debe especificar quién eres', 'warning');
      return;
    }

    const usuario = new Usuario(forma.value.nombre,
      forma.value.apellido, forma.value.movil, forma.value.correo, this.seleccionado,
      null, null, null, null, '1');

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => {
        this.router.navigate(['/login']);
      });
  }

  //MÉTODO PARA SELECCIONAR EL ROL DEL USUARIO
  seleccionar( event: any){
    this.seleccionado = event.target.value;
    console.log(this.seleccionado);
  }
}
