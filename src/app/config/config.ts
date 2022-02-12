//export const URL_SERVICIOS = 'http://localhost:3000';
export const URL_SERVICIOS = 'https://backendlh.herokuapp.com';
export const MILISEGUNDOS = 2.628e+9; //constante para calcular los meses (tiempo de alquiler)
export const EXPRESIONEMAIL = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
//export const EXPRESIONMOVIL = '(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}';
export const EXPRESIONPASSWORD = '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{6,}$';
export const EXPRESIONFLOAT = '^[+-]?([0-9]*[.])?[0-9]+$';


export const TIPOSDEINMUEBLE = ['Seleccionar...', "Casa", "Departamento", "Cuarto", "Minidepartamento"];
export const PRECIODEALQUILER = ['Seleccionar...', '<50', '50-100','100-150', '150-200', '>200'];


