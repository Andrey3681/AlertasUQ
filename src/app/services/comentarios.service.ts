import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comentario } from '../interfaces/comentario.interface';

@Injectable({
    providedIn: 'root'
})
export class ComentariosService {
    private apiUrl = 'api/comentarios';
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);

    loading$ = this.loadingSubject.asObservable();
    error$ = this.errorSubject.asObservable();

    constructor(private http: HttpClient) {}

    obtenerComentariosPorReporte(reporteId: string): Observable<Comentario[]> {
        return this.http.get<Comentario[]>(`${this.apiUrl}/reporte/${reporteId}`);
    }

    agregarComentario(comentario: Comentario): Observable<Comentario> {
        return this.http.post<Comentario>(this.apiUrl, comentario);
    }

    agregarRespuesta(comentarioId: string, respuesta: Comentario): Observable<Comentario> {
        return this.http.post<Comentario>(`${this.apiUrl}/${comentarioId}/respuestas`, respuesta);
    }

    darLike(comentarioId: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${comentarioId}/like`, {});
    }

    eliminarComentario(comentarioId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${comentarioId}`);
    }
} 