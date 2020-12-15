import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    //SI NO LLEGA UNA IMAGEN, ASIGNO UNA IMAGEN POR DEFECTO
    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    //SI LLEGA UNA IMAGEN DE GOOGLE QUE LA DEVUELVA COMO LLEGA
    /*if ( img.indexOf('https') >= 0) {
      return img;
    }*/

    switch ( tipo ) {
      case 'usuario':
      url += '/usuarios/' + img;
      break;
      default:
        console.log('Tipo de usaurio no existe');
        url += '/usuarios/xxx';
     }

    return url;
  }

}
