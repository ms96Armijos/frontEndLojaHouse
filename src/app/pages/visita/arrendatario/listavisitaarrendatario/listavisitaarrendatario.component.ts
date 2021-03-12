import { VisitasarrendatarioService } from './../../../../services/visita/visitasarrendatario.service';
import { ToastrService } from 'ngx-toastr';
import { Visita } from './../../../../models/visita.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-listavisitaarrendatario',
  templateUrl: './listavisitaarrendatario.component.html',
  styleUrls: ['./listavisitaarrendatario.component.css']
})
export class ListavisitaarrendatarioComponent implements OnInit {

  visitas: Visita[] = [];
  desde = 0;
  //urlActual;

  constructor( public _visitaArrendatarioService: VisitasarrendatarioService,  public toastr: ToastrService ) { }

  ngOnInit(): void {
    /*this.urlActual = document.location.href;

    const separoLaCadena = this.urlActual.split('/');
    const obtengoSoloElNombre  = separoLaCadena[separoLaCadena.length - 1]
    console.log('url: ' + obtengoSoloElNombre);

    if(obtengoSoloElNombre === 'arrendatario-visitas'){
      this.cargarSolicitudesArrendatarioAdministrador();
    }*/
    this.cargarSolicitudesArrendatario();
  }

  cargarSolicitudesArrendatario(){
    this._visitaArrendatarioService.cargarVisitasArrendatario(this.desde)
    .subscribe( visitas => this.visitas = visitas);
  }


  /*cargarSolicitudesArrendatarioAdministrador(){
    this._visitaArrendatarioService.cargarVisitasArrendatarioAdministrador(this.desde)
    .subscribe( visitas => this.visitas = visitas);
  }*/


  cambiarPaginacion(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this._visitaArrendatarioService.totalSolicitudVisitas) {
      this.toastr.error('Solo existen ' + this._visitaArrendatarioService.totalSolicitudVisitas + ' items', 'Ya no se puede avanzar más');
      return;
    }
    if (desde < 0) {
      this.toastr.error(this.desde + ' items para retroceder', 'Ya no se puede retroceder más');
      return;
    }
    this.desde += valor;
    this.cargarSolicitudesArrendatario();
  }

  buscarSolicitudesArrendatario(termino: string){

    if ( termino.length <= 0 ){
      this.cargarSolicitudesArrendatario();
      return;
    }
    this._visitaArrendatarioService.buscarVisitasArrendatario( termino )
    .subscribe( visitas => this.visitas = visitas);

  }


  borrarVisita(visita: Visita){


      swal({
        title: '¿Está seguro de realizar la siguiente acción?',
        text: 'La visita será: ELIMINADA',
        icon: 'warning',
        buttons: [
          'Cancelar',
          'Aceptar'
        ],
        dangerMode: true,
      }).then(borrar => {
        if (borrar) {
          visita.estado ='ELIMINADA'

          this._visitaArrendatarioService.eliminarVisita(visita)
            .subscribe(borrados => {
              this.cargarSolicitudesArrendatario();
            });
          //this.toastr.success('Visita ELIMINADA satisfactoriamente');
        }
      });
  }

}
