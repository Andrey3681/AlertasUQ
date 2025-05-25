import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../interfaces/mensaje.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {
  private readonly apiEnum = environment.apiUrl + '/enums';


  constructor(private http: HttpClient) {}

  obtenerCiudades(): Observable<MensajeDTO<string[]>> {
    return this.http.get<MensajeDTO<string[]>>(this.apiEnum + '/ciudades');
  }
}
