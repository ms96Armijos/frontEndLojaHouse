import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
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

  formularioServicio: FormGroup;


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

    this.formularioServicio = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(80)])
    });

  }

  onResetForm(){
    this.formularioServicio.reset();
  }


  obtenerServicio(id: string){
    this._basicosService.obtenerServicio( id )
    .subscribe( servicio => {
      this.formularioServicio.get('nombre').setValue(servicio.nombre)
      //console.log(servicio);
      this.servicios = servicio;
    });
  }

  crearServicio(){

    if (this.formularioServicio.invalid) {
      return;
    }

    this.servicios.nombre = this.formularioServicio.value.nombre;

      this._basicosService.crearServicio(this.servicios)
        .subscribe(resp => {
          this.onResetForm();
          this.router.navigate(['/servicios']);
        });

  }

  get nombre(){ return this.formularioServicio.get('nombre');}

  regresarPagina(){
    window.history.back();
  }

}
