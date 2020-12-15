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
  styles: [],
})
export class CambiopasswordComponent implements OnInit {
  usuario: Usuario;
  password: string='';
  password2: string='';

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public toastr: ToastrService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    this.usuario = tokenPayload.usuario;
  }

  actualizarPassword(usuario: Usuario) {
    if (this.password.length === 0 || this.password === '') {
      this.toastr.warning('¡Lo siento!', 'Debes ingresar tu contraseña');
      return;
    }

    if (this.password2.length === 0 || this.password2 === '') {
      this.toastr.warning('¡Lo siento!', 'Debes confirmar tu contraseña ingresada');
      return;
    }

    if (this.password !== this.password2) {
      swal('Oppss...', 'Las contraseñas no coinciden', 'error');
      return;
    }

    if (this.password === this.password2) {
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
    }
  }
}
