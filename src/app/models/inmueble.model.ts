import { Usuario } from './usuario.model';
export class Inmueble {

  constructor(
    public nombre: string,
    public descripcion: string,
    public direccion: string,
    public codigo: string,
    public tipo: string,
    public precioalquiler: string,
    public barrio: string,
    public ciudad: string,
    public provincia: string,
    public garantia?: string,
    public servicio?: Array<string>,
    public imagen?: string,
    public estado?: string,
    public publicado?: string,
    public usuario?: Usuario,
    public _id?: string
  ) { }

}
