import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../interfaces/respesta.interfaces';

import { HttpClient } from '@angular/common/http'; 


@Injectable({
 providedIn: 'root'
})
export class ImagenService {


 private imagenURL = "http://localhost:8080/api/imagenes";


 constructor(private http: HttpClient) { }


 public subirImagen(imagen: File): Observable<RespuestaDTO> {
   const formData = new FormData();
   formData.append('imagen', imagen);
   return this.http.post<RespuestaDTO>(this.imagenURL, formData);
 }


 public eliminarImagen(id: string): Observable<RespuestaDTO> {
   return this.http.delete<RespuestaDTO>(this.imagenURL, { params: { id } });
 }
}

