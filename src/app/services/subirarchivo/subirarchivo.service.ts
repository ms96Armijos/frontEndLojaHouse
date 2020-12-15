import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirarchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let peticion = new XMLHttpRequest();

      formData.append("imagen", archivo, archivo.name);
      peticion.onreadystatechange = function () {
        if (peticion.readyState === 4) {
          if (peticion.status === 200) {
            resolve(JSON.parse(peticion.response));
          } else {
            reject(peticion.response);
          }
        }
      };

      let url = URL_SERVICIOS + "/img/" + tipo + "/" + id;

      console.log(url)
      peticion.open("PUT", url, true);
      peticion.send(formData);
    });
  }

}
