export class Mensaje {

  constructor(
    public titulo: string,
    public asunto: string,
    public fecha: Date,
    public correo: string,
    public estado?: string,
    public _id?: string
  ) { }

}
