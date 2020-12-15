import { NgForm } from '@angular/forms';
import { Usuario } from './../models/usuario.model';
import { UsuarioService } from './../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {


  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
  }

  ingresar(forma: NgForm) {
    if (forma.invalid){
      return;
    }


    const usuario = new Usuario(null, null, null, forma.value.correo, null, forma.value.password, null, null, null, null, null);
    this._usuarioService.login(usuario)
    .subscribe( resp => {
        window.location.href = '/dashboard';
    });

  }

}