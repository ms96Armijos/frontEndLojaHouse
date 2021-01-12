import { VisitasarrendatarioService } from './../../../../services/visita/visitasarrendatario.service';
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
  //visitas: Visita = {} as Visita;
  visitas: Visita = new Visita(new Date(), "", Object(), Object(), "");
  timer = null;
  time = 1000;


  constructor( public _visitaService: VisitasarrendatarioService,
    public router: Router, public activatedRoute: ActivatedRoute ) {

      activatedRoute.params.subscribe(parametros => {
        this.id = parametros['idvisita'];

      });
    }

    ngOnInit(): void {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
      this.obtenerVisitaArrendatario(this.id);
    }, this.time);
  }

  obtenerVisitaArrendatario(id: string){
    this._visitaService.obtenerUnaVisitaArrendatario( id )
    .subscribe( visita => {
      this.visitas = visita;
     //console.log('visita: '+this.visitas.inmueble.nombre );
    });

  }
}
