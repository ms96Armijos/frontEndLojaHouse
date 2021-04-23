import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import decode from 'jwt-decode';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  subirImagen: File;
  imagenTemporal: string;
  correoUsuario: string;
  rolUsuario: string;

  formularioPerfil: FormGroup;

  constructor( public _usuarioService: UsuarioService, public toastr: ToastrService ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    console.log(tokenPayload);
    this.obtenerUsuario(tokenPayload.usuario._id);

    this.formularioPerfil = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
      cedula: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      movil: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      convencional: new FormControl('', [Validators.minLength(0), Validators.maxLength(10)])
    });

  }

  obtenerUsuario(id: string){
    this._usuarioService.obtenerUsuario( id )
    .subscribe( usuarioObtenido => {
      this.formularioPerfil.get('nombre').setValue(usuarioObtenido.nombre)
      this.formularioPerfil.get('apellido').setValue(usuarioObtenido.apellido)
      this.formularioPerfil.get('cedula').setValue(usuarioObtenido.cedula)
      this.formularioPerfil.get('movil').setValue(usuarioObtenido.movil)
      this.formularioPerfil.get('convencional').setValue(usuarioObtenido.convencional)

      this.usuario._id = usuarioObtenido._id;
      this.correoUsuario = usuarioObtenido.nombre;
      this.rolUsuario = usuarioObtenido.rol;
     //console.log('visita: '+this.visitas.inmueble.nombre );
    });
  }

  ActualizarInformacionPerfil() {

   /* if(usuario.nombre.trim() === ''){
      this.toastr.warning('Debes ingresar tus nombres');
      return;
    }

    if (usuario.nombre.length < 3) {
      this.toastr.warning('El nombre debe tener mínimo 3 caracteres');
      return;
    }
    if (usuario.nombre.length > 80) {
      this.toastr.warning('Excede el número de caracteres permitidos');
      return;
    }


    if(usuario.apellido.trim() === ''){
      this.toastr.warning('Debes ingresar tus apellidos');
      return;
    }
    if (usuario.apellido.length < 3) {
      this.toastr.warning('El nombre debe tener mínimo 3 caracteres');
      return;
    }
    if (usuario.apellido.length > 80) {
      this.toastr.warning('Excede el número de caracteres permitidos');
      return;
    }


    if(usuario.movil.trim() === '' || (usuario.movil.length > 0 && usuario.movil.length < 10)){
      //this.toastr.warning('Debes ingresar tu número de celular');
      return;
    }
    if(usuario.cedula.trim() === ''){
      this.toastr.warning('Debes ingresar tu número de cédula');
      return;
    }

    if(!this.validarcedula(usuario.cedula)){
      this.toastr.warning('El número de cédula es inválido');
      return;
    }

    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    this.usuario.movil = usuario.movil;
    this.usuario.convencional = usuario.convencional;
    this.usuario.cedula = usuario.cedula;*/


    if(this.formularioPerfil.invalid){
      return;
    }
    this.usuario.nombre = this.formularioPerfil.value.nombre;
    this.usuario.apellido = this.formularioPerfil.value.apellido;
    this.usuario.movil = this.formularioPerfil.value.movil;
    this.usuario.cedula = this.formularioPerfil.value.cedula;
    this.usuario.convencional = this.formularioPerfil.value.convencional;

    console.log(this.usuario)
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
    swal(
      'Actualización exitosa',
      'Se ha actualizado su información correctamente',
      'success'
    );
  }

   validarcedula(a) {
		var total = 0;
		var longitud = a.length;
		var longcheck = longitud - 1;


		for (let i = 0; i < longcheck; i++) {
			if (i % 2 === 0) {
				var aux = a.charAt(i) * 2;
				if (aux > 9) aux -= 9;
				total += aux;
			} else {
				total += parseInt(a.charAt(i)); // parseInt o concatenará en lugar de sumar
			}
		}

		total = total % 10 ? 10 - total % 10 : 0;

		if (a.charAt(longitud - 1) == total) {
      return true;
			//document.getElementById("salida").innerHTML = ("* Cédula Válida");

		} else {
      return false;
			//document.getElementById("salida").innerHTML = ("* Cédula Inválida");
		}

	}

  seleccionarImagen(archivo: File) {
    if (!archivo) {
      this.subirImagen = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imágen', 'error');
      this.subirImagen = null;
      return;
    }
    this.subirImagen = archivo;

    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result as string;
  }

  cambiarImagen() {
    this._usuarioService.actualizarImagen(this.subirImagen, this.usuario._id);

  }

  regresarPagina(){
    window.history.back();
  }

  get nombre(){ return this.formularioPerfil.get('nombre');}
  get apellido(){ return this.formularioPerfil.get('apellido');}
  get cedula(){ return this.formularioPerfil.get('cedula');}
  get movil(){ return this.formularioPerfil.get('movil');}
  get convencional(){ return this.formularioPerfil.get('convencional');}


}
