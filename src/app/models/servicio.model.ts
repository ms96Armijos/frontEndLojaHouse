import { Usuario } from './usuario.model';
export class Servicio {

  constructor(
    public nombre: string,
    public usuario?: Usuario,
    public _id?: string
  ) { }

}
