import { EXPRESIONPASSWORD } from './../../config/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Component({
  selector: 'app-cambiopassword',
  templateUrl: './cambiopassword.component.html',
  styleUrls: ['./cambiopassword.component.css'],
})
export class CambiopasswordComponent implements OnInit {
  usuario: Usuario;
  password: string='';
  password2: string='';

  formularioCambiarPassword: FormGroup;
  patron = new RegExp(EXPRESIONPASSWORD);

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public toastr: ToastrService
  ) {
    this.usuario = this._usuarioService.usuario;
  }


  comparandoPassword(pass1: string, pass2: string){

    return (group: FormGroup) => {

      let contra1 = group.controls[pass1].value;
      let contra2 = group.controls[pass2].value;

      if(contra1 === contra2){
        return null;
      }


      return {
        comparandoPassword: true
      };
    };
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    this.usuario = tokenPayload.usuario;

    this.formularioCambiarPassword = new FormGroup({
      pass1: new FormControl('', [Validators.required, Validators.pattern(this.patron), Validators.minLength(6), Validators.maxLength(18)]),
      pass2: new FormControl('', [Validators.required, Validators.pattern(this.patron), Validators.minLength(6), Validators.maxLength(18)]),
    }, {
      validators: this.comparandoPassword('pass1', 'pass2')
    });

  }
  onResetForm(){
    this.formularioCambiarPassword.reset();
  }


  actualizarPassword() {
    if (this.formularioCambiarPassword.invalid){
      return 'Formulario inválido';
    }

    this.usuario.password = this.formularioCambiarPassword.value.pass1;
      this._usuarioService.cambiarPassword(this.usuario).subscribe((resp) => {
        if (resp) {
          swal(
            'Actualización exitosa',
            'Se ha actualizado su información correctamente',
            'success'
          );
          this.onResetForm();
        }
        //this.router.navigate(['/dashboard']);
      });
   /* if (this.password.length === 0 || this.password === '') {
      this.toastr.warning( 'Debes ingresar tu contraseña','¡Lo siento!');
      return;
    }

    if (this.password2.length === 0 || this.password2 === '') {
      this.toastr.warning('Debes confirmar tu contraseña ingresada', '¡Lo siento!');
      return;
    }

    if (this.password.length === 0 && this.password2.length === 0) {
      this.toastr.warning( 'Debes ingresar tu contraseña', '¡Lo siento!');
      return;
    }

    if (this.password !== this.password2) {
      swal('Oppss...', 'Las contraseñas no coinciden', 'error');
      return;
    }*/

    /*if (this.password === this.password2) {
      console.log(this.password);
      this.usuario.password = this.password;
      this._usuarioService.cambiarPassword(this.usuario).subscribe((resp) => {
        if (resp) {
          swal(
            'Actualización exitosa',
            'Se ha actualizado su información correctamente',
            'success'
          );
          this.password = '';
          this.password2 = '';
        }
        this.router.navigate(['/dashboard']);
      });
    }*/
  }

  get pass1(){ return this.formularioCambiarPassword.get('pass1');}
  get pass2(){ return this.formularioCambiarPassword.get('pass2');}

  regresarPagina(){
    window.history.back();
  }
}
