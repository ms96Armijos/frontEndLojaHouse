import { EXPRESIONEMAIL } from './../config/config';
import { Router } from '@angular/router';
import { EnviarmensajeService } from './../services/enviarmensaje/enviarmensaje.service';
import { Mensaje } from './../models/mensaje.model';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare function inicializarPluginsSidebar();

@Component({
  selector: 'app-enviarmensaje',
  templateUrl: './enviarmensaje.component.html',
  styleUrls: ['./enviarmensaje.component.css']
})
export class EnviarmensajeComponent implements OnInit {

  mensajes: Mensaje = new Mensaje(null, null, null, null, null, null);

  formularioEnviarMensaje: FormGroup;
  patternEmail = EXPRESIONEMAIL;


  constructor(public _mensajeService: EnviarmensajeService, public router: Router) { }

  ngOnInit(): void {
    inicializarPluginsSidebar();

    this.formularioEnviarMensaje = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      asunto: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]),
      correo: new FormControl('', [Validators.required, Validators.pattern(this.patternEmail), Validators.minLength(5), Validators.maxLength(30)]),
    });
  }

  onResetForm(){
    this.formularioEnviarMensaje.reset();
  }


  crearMensaje() {


    if (this.formularioEnviarMensaje.invalid) {
      return;
    }

   let fechaActual = new Date();

    const mensaje = new Mensaje(this.formularioEnviarMensaje.value.titulo, this.formularioEnviarMensaje.value.asunto, fechaActual, this.formularioEnviarMensaje.value.correo);

    console.log(mensaje);
    this._mensajeService.crearMensaje(mensaje)
      .subscribe(resp => {
       if(resp.ok === true){
        this.onResetForm();
        this.router.navigate(['/principal']);
       }
      });
  }

  get titulo(){ return this.formularioEnviarMensaje.get('titulo');}
  get asunto(){ return this.formularioEnviarMensaje.get('asunto');}
  get correo(){ return this.formularioEnviarMensaje.get('correo');}



  regresarPagina(){
    window.history.back();
  }

}
