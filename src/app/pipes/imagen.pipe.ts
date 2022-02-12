import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg';

    //SI NO LLEGA UNA IMAGEN, ASIGNO UNA IMAGEN POR DEFECTO
    if ( !img ) {
      return url;
    }

    //SI LLEGA UNA IMAGEN DE GOOGLE QUE LA DEVUELVA COMO LLEGA
    /*if ( img.indexOf('https') >= 0) {
      return img;
    }*/

    switch ( tipo ) {
      case 'usuario':
      url = img;
      break;
      default:
        url;
     }


    return url;
  }

}
