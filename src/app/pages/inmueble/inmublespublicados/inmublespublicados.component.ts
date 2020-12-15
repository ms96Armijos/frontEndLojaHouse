import { ToastrService } from 'ngx-toastr';
import { InmuebleService } from './../../../services/inmueble/inmueble.service';
import { Inmueble } from './../../../models/inmueble.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inmublespublicados',
  templateUrl: './inmublespublicados.component.html',
  styleUrls: ['./inmublespublicados.component.css']
})
export class InmublespublicadosComponent implements OnInit {

  inmuebles: Inmueble[] = [];
  imagenTemporal: string;
  desde: number = 0;


  constructor( public _inmuebleService: InmuebleService, public toastr: ToastrService ) { }

  ngOnInit(): void {
    this.cargarInmueblesPublicados();
  }

  cargarInmueblesPublicados() {
    this._inmuebleService.cargarInmueblesPublicados(this.desde)
      .subscribe(inmuebles => this.inmuebles = inmuebles);
  }

  cambiarPaginacion(valor: number) {
    const desde: number = this.desde + valor;

    if (desde >= this._inmuebleService.totalInmuebles) {
      this.toastr.error('Solo existen ' + this._inmuebleService.totalInmuebles + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }


    this.desde += valor;
    this.cargarInmueblesPublicados();
  }

  buscarInmuebles(termino: string) {


    if (termino.length <= 0) {
      this.cargarInmueblesPublicados();
      return;
    }
    this._inmuebleService.buscarInmuebles(termino)
      .subscribe(inmuebles => this.inmuebles = inmuebles);

  }


}
