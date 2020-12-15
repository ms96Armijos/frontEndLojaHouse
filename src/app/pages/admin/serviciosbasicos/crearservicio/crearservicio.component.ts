import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosbasicosService } from './../../../../services/serviciosbasicos/serviciosbasicos.service';
import { Servicio } from './../../../../models/servicio.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearservicio',
  templateUrl: './crearservicio.component.html',
  styleUrls: ['./crearservicio.component.css']
})
export class CrearservicioComponent implements OnInit {

  servicios: Servicio = new Servicio('', null);

  constructor( public _basicosService: ServiciosbasicosService,
    public router: Router, public activatedRoute: ActivatedRoute ) {

      activatedRoute.params.subscribe(parametros => {
        let id = parametros['idservicio'];

        if(id !== 'nuevo'){
          this.obtenerServicio(id);
        }
      });

    }

  ngOnInit(): void {
  }

  obtenerServicio(id: string){
    this._basicosService.obtenerServicio( id )
    .subscribe( servicio => {

      console.log(servicio);
      this.servicios = servicio;
    });
  }

  crearServicio(forma: NgForm){

      if (forma.invalid) {
        return;
      }

      this.servicios.nombre = forma.value.nombre;

      this._basicosService.crearServicio(this.servicios)
        .subscribe(resp => {
          this.router.navigate(['/servicios']);
        });

  }

}
