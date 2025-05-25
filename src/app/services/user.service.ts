import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditarUsuarioDTO, EliminarUsuarioDTO, RegistrarUsuarioDTO, User, ActivarCuentaDTO, RestablecerContrasenaDTO } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { RespuestaDTO } from '../interfaces/respesta.interfaces';
import { ReporteDTO } from '../interfaces/reporte.interface';
import { MensajeDTO } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  //metodo para registrar un usuario
  registrarUsuario(registrarUsuario: RegistrarUsuarioDTO): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.apiUrl}`, registrarUsuario);
  }
  
  //metodo para obtener un usuario por su id
  obtenerUsuarioPorId(id: string): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/${id}`);
  }
  //metodo para obtener un usuario por su email
  obtenerUsuarioPorEmail(email: string): Observable<RespuestaDTO> {
    return this.http.get<RespuestaDTO>(`${this.apiUrl}/email/${email}`);
  }

  eliminarUsuario(eliminarUsuario: EliminarUsuarioDTO): Observable<RespuestaDTO> {
    return this.http.delete<RespuestaDTO>(`${this.apiUrl}`, { body: eliminarUsuario });
  }

  editarUsuario(editarUsuario: EditarUsuarioDTO): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.apiUrl}`, editarUsuario);
  }

  solicitarRestablecer(email: string): Observable<RespuestaDTO> {
    return this.http.post<RespuestaDTO>(`${this.apiUrl}/codigoVerificacion/${email}`, {});
  }

  restablecerContrasena(restablecerContrasena: RestablecerContrasenaDTO): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.apiUrl}/password`, restablecerContrasena);
  }
  
  activarCuenta(activarCuenta: ActivarCuentaDTO): Observable<RespuestaDTO> {
    return this.http.put<RespuestaDTO>(`${this.apiUrl}/estado`, activarCuenta);
  }

  obtenerReportesUsuario(id: string): Observable<MensajeDTO<ReporteDTO[]>> {
    return this.http.get<MensajeDTO<ReporteDTO[]>>(`${this.apiUrl}/reportes/${id}`);
  }
}
  
  
  

 
