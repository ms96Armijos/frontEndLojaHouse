import { Router } from '@angular/router';
import { EnviarmensajeService } from './../services/enviarmensaje/enviarmensaje.service';
import { Mensaje } from './../models/mensaje.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare function inicializarPluginsSidebar();

@Component({
  selector: 'app-enviarmensaje',
  templateUrl: './enviarmensaje.component.html',
  styleUrls: ['./enviarmensaje.component.css']
})
export class EnviarmensajeComponent implements OnInit {

  mensajes: Mensaje = new Mensaje(null, null, null, null, null, null);


  constructor(public _mensajeService: EnviarmensajeService, public router: Router) { }

  ngOnInit(): void {
    inicializarPluginsSidebar();
  }

  crearMensaje(forma: NgForm) {


    if (forma.invalid) {
      return;
    }

   let fechaActual = new Date();

    const mensaje = new Mensaje(forma.value.titulo, forma.value.asunto, fechaActual, forma.value.correo);

    console.log(mensaje);
    this._mensajeService.crearMensaje(mensaje)
      .subscribe(resp => {
       if(resp.ok === true){
        this.router.navigate(['/principal']);
       }
      });
  }

}
