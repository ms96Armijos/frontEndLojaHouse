import { Usuario } from './usuario.model';
import { Inmueble } from './inmueble.model';
export class Contrato {

  constructor(
    public nombrecontrato: string,
    public fechainicio: Date,
    public fechafin: Date,
    public monto: number,
    public tiempocontrato?: number,
    public inmueble?: Inmueble,
    public usuarioarrendador?: Usuario,
    public usuarioarrendatario?: Usuario,
    public estado?: string,
    public acuerdo?: string,
    public _id?: string
  ) { }

}
