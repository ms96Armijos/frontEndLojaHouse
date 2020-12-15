import { VisitasarrendatarioService } from './../../../../services/visita/visitasarrendatario.service';
import { NgForm } from '@angular/forms';
import { Visita } from './../../../../models/visita.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vervisitasrealizadas',
  templateUrl: './vervisitasrealizadas.component.html',
  styleUrls: ['./vervisitasrealizadas.component.css']
})
export class VervisitasrealizadasComponent implements OnInit {

  id: string = null;
  visitas: Visita = new Visita(null, null, null, null, null);

  constructor( public _visitaService: VisitasarrendatarioService,
    public router: Router, public activatedRoute: ActivatedRoute ) {

      activatedRoute.params.subscribe(parametros => {
        this.id = parametros['idvisita'];
      });
    }

    ngOnInit(): void {
      this.obtenerVisitaArrendatario(this.id);
  }

  obtenerVisitaArrendatario(id: string){
    this._visitaService.obtenerUnaVisitaArrendatario( id )
    .subscribe( visita => {

      this.visitas = visita;
     //console.log('visita: '+this.visitas.inmueble.nombre );
    });
  }

  modificarVisita(forma: NgForm){
    if (forma.invalid) {
      return;
    }

    this.visitas.descripcion = forma.value.descripcion;
  }

}
