import { NgForm } from '@angular/forms';
import { Visita } from './../models/visita.model';
import { VisitaService } from './../services/visita/visita.service';
import { UsuarioService } from './../services/usuario/usuario.service';
import { InmuebleService } from './../services/inmueble/inmueble.service';
import * as JWT from 'jwt-decode';
import { Usuario } from './../models/usuario.model';
import { Inmueble } from './../models/inmueble.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginapublica',
  templateUrl: './paginapublica.component.html',
  styleUrls: ['./paginapublica.component.css']
})
export class PaginapublicaComponent implements OnInit {

  inmuebles: Inmueble = new Inmueble(null, null, null, null, null, null);
  usuarios: Usuario = new Usuario(null, null, null, null, null);

  token = localStorage.getItem('token');
  tokenPayload = JWT(this.token);



  constructor(public _inmuebleService: InmuebleService,
    public _usuarioService: UsuarioService,
    public _visitaService: VisitaService,
    public router: Router, public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(parametros => {
      const id = parametros['idinmueble'];
      this.obtenerInmueble(id);
    });
  }

  ngOnInit(): void {
    this.obtenerArrendatario(localStorage.getItem(this.tokenPayload.usuario._id));
  }

  obtenerInmueble(id: string) {
    this._inmuebleService.obtenerInmueble(id)
      .subscribe(inmueble => {
        this.inmuebles = inmueble;
        console.log(this.inmuebles);
      });
  }

  obtenerArrendatario(id: string) {
    this._usuarioService.obtenerUsuario(id)
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        console.log(this.usuarios);
      });
  }

  crearVisita(forma: NgForm) {

    let arrendatario_id = this.tokenPayload.usuario._id;
    let idinmueble = this.inmuebles._id;

    console.log(arrendatario_id + ' ' + idinmueble)
    if (forma.invalid) {
      return;
    }

    //const fecha = new Date(forma.value.fecha);

    const visita = new Visita(forma.value.fecha, forma.value.descripcion, Object(idinmueble), Object(arrendatario_id), 'PENDIENTE');

    console.log(visita);
    this._visitaService.crearVisita(visita)
      .subscribe(resp => {
       this.router.navigate(['/visitas-arrendatario']);
      });
  }

}
