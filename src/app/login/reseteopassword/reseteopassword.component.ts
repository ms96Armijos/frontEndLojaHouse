import { EXPRESIONEMAIL } from './../../config/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { Router } from '@angular/router';

declare function inicializarPluginsSidebar();


@Component({
  selector: 'app-reseteopassword',
  templateUrl: './reseteopassword.component.html',
  styleUrls: ['./reseteopassword.component.css']
})
export class ReseteopasswordComponent implements OnInit {
  usuario: Usuario;
  //correo: string;
  email:any;

  formularioResetPassword: FormGroup;
  patternEmail = EXPRESIONEMAIL;

  constructor( public router: Router, public _usuarioService: UsuarioService, public toastr: ToastrService ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
    inicializarPluginsSidebar();

    this.formularioResetPassword = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern(this.patternEmail), Validators.minLength(5), Validators.maxLength(30)]),
    });
  }

  resetearPassword() {

    if(this.formularioResetPassword.invalid){
      return;
    }

     this.email = {
      'correo': this.formularioResetPassword.value.correo
    }

    swal({
      title: 'Se reseteará la contraseña del usuario: ' + this.formularioResetPassword.value.correo,
      text: '¿Está seguro que ingresó bien su nombre de usuario?',
      icon: 'warning',
      buttons: [
        'Cancelar',
        'Aceptar'
      ],
      dangerMode: true,
    }).then(reseteoPassord => {
      if (reseteoPassord) {
        this._usuarioService.reseteoDePassword(this.email).subscribe();
      }
    });
  }

  get correo(){ return this.formularioResetPassword.get('correo');}

  regresarPagina(){
    window.history.back();
  }


}
