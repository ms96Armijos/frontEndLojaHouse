import { EnviarmensajeService } from './../../../services/enviarmensaje/enviarmensaje.service';
import { Mensaje } from './../../../models/mensaje.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vermensaje',
  templateUrl: './vermensaje.component.html',
  styleUrls: ['./vermensaje.component.css']
})
export class VermensajeComponent implements OnInit {

  id: string = null;
  mensaje: Mensaje = new Mensaje(null, null, null, null);


  constructor(public _enviarMensajeService: EnviarmensajeService, public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(parametros => {
      this.id = parametros['idmensaje'];
    });
  }

  ngOnInit(): void {
    this.obtenerMensaje(this.id);
  }

  obtenerMensaje(id: string){
    this._enviarMensajeService.obtenerMensaje( id )
    .subscribe( mensaje => {

      this.mensaje = mensaje;
     //console.log('visita: '+this.visitas.inmueble.nombre );
    });
  }


}
