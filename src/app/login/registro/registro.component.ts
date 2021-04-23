import { EXPRESIONEMAIL } from './../../config/config';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as swal from 'sweetalert';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

declare function inicializarPluginsSidebar();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  seleccionado: string = '';

  formularioRegistro: FormGroup;
  patternEmail = EXPRESIONEMAIL;

   usuario: Usuario = new Usuario(null, null, null, null, null);

  constructor( public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit(): void {
    inicializarPluginsSidebar();

    this.formularioRegistro = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
      movil: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      correo: new FormControl('', [Validators.required, Validators.pattern(this.patternEmail), Validators.minLength(5), Validators.maxLength(30)]),
      rol: new FormControl('', [Validators.required])
    });

  }

  onResetForm(){
    this.formularioRegistro.reset();
  }

  registrarUsuario() {

    if (this.formularioRegistro.invalid) {
      return;
    }

    if (this.seleccionado === "" || this.seleccionado==='SELECCIONAR' ) {
      swal.default('¡Importante!', 'Debe especificar quién eres', 'warning');
      return;
    }

    this.usuario.nombre = this.formularioRegistro.value.nombre;
    this.usuario.apellido = this.formularioRegistro.value.apellido;
    this.usuario.movil = this.formularioRegistro.value.movil;
    this.usuario.correo = this.formularioRegistro.value.correo;
    this.usuario.rol = this.seleccionado;
    this.usuario.estado = '1';

    /*const usuario = new Usuario(this.formularioRegistro.value.nombre,
      this.formularioRegistro.value.apellido, this.formularioRegistro.value.movil, this.formularioRegistro.value.correo, this.seleccionado,
      null, null, null, null, '1');*/

    this._usuarioService.crearUsuario(this.usuario)
      .subscribe(resp => {
        this.onResetForm();
        this.router.navigate(['/login']);
      });
  }

  //MÉTODO PARA SELECCIONAR EL ROL DEL USUARIO
  seleccionar( event: any){
    this.seleccionado = event.target.value;
    console.log(this.seleccionado);
  }

  get nombre(){ return this.formularioRegistro.get('nombre');}
  get apellido(){ return this.formularioRegistro.get('apellido');}
  get movil(){ return this.formularioRegistro.get('movil');}
  get correo(){ return this.formularioRegistro.get('correo');}
  get rol(){ return this.formularioRegistro.get('rol');}

  regresarPagina(){
    window.history.back();
  }
}
