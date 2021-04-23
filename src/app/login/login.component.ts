import { EXPRESIONEMAIL } from './../config/config';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from './../models/usuario.model';
import { UsuarioService } from './../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function inicializarPluginsSidebar();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  patternEmail = EXPRESIONEMAIL;

  usuario: Usuario = new Usuario();

  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    inicializarPluginsSidebar();

    this.formularioLogin = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern(this.patternEmail), Validators.minLength(5), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    });
  }

  onResetForm(){
    this.formularioLogin.reset();
  }

  ingresar() {
    if (this.formularioLogin.invalid){
      return 'Formulario inválido';
    }


    this.usuario.correo = this.formularioLogin.value.correo;
    this.usuario.password = this.formularioLogin.value.password;

    console.log(this.usuario)
    this._usuarioService.login(this.usuario)
    .subscribe( resp => {
      this.onResetForm();
        window.location.href = '/dashboard';
    });

  }


  get correo(){ return this.formularioLogin.get('correo');}
  get password(){ return this.formularioLogin.get('password');}

  regresarPagina(){
    window.history.back();
  }

}
