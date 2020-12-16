import { ActivatedRoute } from '@angular/router';
import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { Inmueble } from './../../../../models/inmueble.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminverinmueble',
  templateUrl: './adminverinmueble.component.html',
  styleUrls: ['./adminverinmueble.component.css']
})
export class AdminverinmuebleComponent implements OnInit {

  idInmueble: string;
  inmueble: Inmueble;

  existeInmueble: boolean = false;

  constructor( public _inmuebleService: InmuebleService, public activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(parametros => {
      this.idInmueble = parametros['idinmueble'];
      //console.log(this.idInmueble);
    });

  }

  ngOnInit(){
    this.obtenerInmueble(this.idInmueble);
  }


  obtenerInmueble(id: string){
    this._inmuebleService.obtenerInmueble( id )
    .subscribe( inmuebleObtenido => {
      this.inmueble = inmuebleObtenido;
      this.existeInmueble = true;
      //console.log(this.inmueble)
    });
  }

}
