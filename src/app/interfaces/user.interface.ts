export interface User {
  id: string;
  nombre: string;
  apellido: string;
  ciudad: string;
  email: string;
  direccion?: string;
} 

export interface EliminarUsuarioDTO{
  id:string;
  password:string;
}

export interface EditarUsuarioDTO{
  id:string;
  nombre:string;
  ciudad:string;
  direccion:string;
}
export interface RegistrarUsuarioDTO{
  nombre:String
  direccion:String
  ciudad:String
  email:String
  password:String
}

export interface RestablecerContrasenaDTO{
  email:string;
  password:string;
}
export interface ActivarCuentaDTO {
  email: string;
  codigoActivacion: string;
}
