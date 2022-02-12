import { Inmueble } from './inmueble.model';
import { Usuario } from './usuario.model';

export class Visita {
  constructor(
    public fecha: Date,
    public descripcion: string,
    public inmueble: Inmueble,
    public usuarioarrendatario: Usuario,
    public estado?: string,
    public _id?: string
  ) { }

}
