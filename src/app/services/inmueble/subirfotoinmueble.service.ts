import { URL_SERVICIOS } from './../../config/config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubirfotoinmuebleService {

  constructor( private http: HttpClient ) { }

  actualizarFotos(images: File, id: string) {
    //const url = URL_SERVICIOS + '/inmueble/actualizar/fotos/inmueble/5f78ed876b1e7207f8230ada';

    console.log('en el servicio: ')
    console.log(images);
    if (images !== null) {
      const arr = [];
      const formData = new FormData();
      arr.push(images);


      arr[0].forEach((item, i) => {
        formData.append('imagen', arr[0][i]);
      });

      return this.http.put('http://localhost:3000/fotosinmueble/actualizar/fotos/inmueble/' + id, formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        catchError(this.errorMgmt)
      );
    }
  }

  obtenerInmueble(id: string) {
    //const url = URL_SERVICIOS + '/fotosinmueble/5f78ed876b1e7207f8230ada';
    return this.http.get('http://localhost:3000/fotosinmueble/' + id).pipe(map((resp: any) => resp.inmueble));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
