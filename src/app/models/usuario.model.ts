export class Usuario {
  constructor(
    public nombre: string,
    public apellido: string,
    public movil: string,
    public correo: string,
    public rol: string,
    public password?: string,
    public imagen?: string,
    public cedula?: string,
    public convencional?: string,
    public estado?: string,
    public _id?: string
  ){}
}
