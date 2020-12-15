import { Visita } from './../../../../models/visita.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitaService } from './../../../../services/visita/visita.service';
import { UsuarioService } from './../../../../services/usuario/usuario.service';
import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { Usuario } from './../../../../models/usuario.model';
import { Inmueble } from './../../../../models/inmueble.model';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-crearvisita',
  templateUrl: './crearvisita.component.html',
  styleUrls: ['./crearvisita.component.css']
})
export class CrearvisitaComponent implements OnInit {

  inmuebles: Inmueble = new Inmueble(null, null, null, null, null, null);
  usuarios: Usuario = new Usuario(null, null, null, null, null);

  token = localStorage.getItem('token');
  tokenPayload = decode(this.token);


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
