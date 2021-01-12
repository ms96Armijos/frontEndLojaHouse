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

  usuario: Usuario = new Usuario(null, null, null, null, null);
  subirImagen: File;
  imagenTemporal: string;

  constructor( public _usuarioService: UsuarioService, public toastr: ToastrService ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    console.log(tokenPayload);
    this.obtenerUsuario(tokenPayload.usuario._id);
  }

  obtenerUsuario(id: string){
    this._usuarioService.obtenerUsuario( id )
    .subscribe( usuarioObtenido => {

      this.usuario = usuarioObtenido;
     //console.log('visita: '+this.visitas.inmueble.nombre );
    });
  }

  ActualizarInformacionPerfil(usuario: Usuario) {

    if(usuario.nombre.trim() === ''){
      this.toastr.warning('Debes ingresar tus nombres');
      return;
    }
    if(usuario.apellido.trim() === ''){
      this.toastr.warning('Debes ingresar tus apellidos');
      return;
    }
    if(usuario.movil.trim() === ''){
      this.toastr.warning('Debes ingresar tu número de celular');
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
    this.usuario.cedula = usuario.cedula;


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

}
