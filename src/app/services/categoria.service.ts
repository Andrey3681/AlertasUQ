import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActualizarCategoriaDTO, CrearCategoriaDTO, CategoriaDTO } from '../interfaces/Categoria.interface';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly categoriaURL = environment.apiUrl + '/categoria';
  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<MensajeDTO<CategoriaDTO[]>> {
    return this.http.get<MensajeDTO<CategoriaDTO[]>>(this.categoriaURL);
}

crearCategoria(categoria: CrearCategoriaDTO): Observable<MensajeDTO<string>> {
    return this.http.post<MensajeDTO<string>>(this.categoriaURL, categoria);
}

eliminarCategoria(id: string): Observable<MensajeDTO<void>> {
    return this.http.delete<MensajeDTO<void>>(`${this.categoriaURL}/${id}`);
}

actualizarCategoria(categoria: ActualizarCategoriaDTO): Observable<MensajeDTO<void>> {
    return this.http.put<MensajeDTO<void>>(this.categoriaURL, categoria);
}
}



