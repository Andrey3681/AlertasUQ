import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaDTO } from '../interfaces/respesta.interfaces';
import { LoginDTO } from '../interfaces/login.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly authURL = environment.apiUrl + '/autentificar';
    private readonly userURL= environment.apiUrl+'/usuario';

    constructor(private http: HttpClient) {}

    cambiarContrasena(contrasenaActual: string, nuevaContrasena: string): Observable<any> {
        return this.http.post(`${this.authURL}/cambiar-contrasena`, {
            contrasenaActual,
            nuevaContrasena
        });
    }

   
    login(loginData: LoginDTO): Observable<RespuestaDTO> {
        return this.http.post<RespuestaDTO>(`${this.authURL}/iniciarSesion`, loginData);
    }

  

} 