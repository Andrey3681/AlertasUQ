import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, from } from 'rxjs';
import { 
    ReporteDTO,
    RegistrarReporteDto, 
    EditarReporteDto, 
    EliminarReporteDto,
    GestionReporteDto, 
    HistorialEstadoDTO, 
    MarcarReporteDto 
} from '../interfaces/reporte.interface';
import { environment } from '../../environments/environment';
import { MensajeDTO } from '../interfaces/mensaje.interface';
import { UbicacionDTO } from '../interfaces/ubicacion.interface';

@Injectable({
    providedIn: 'root'
})
export class ReportesService {
    private apiUrl = `${environment.apiUrl}/reportes`;
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);

    loading$ = this.loadingSubject.asObservable();
    error$ = this.errorSubject.asObservable();

    constructor(private http: HttpClient) {}

    crearReporte(reporte: RegistrarReporteDto): Observable<MensajeDTO<ReporteDTO>> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.post<MensajeDTO<ReporteDTO>>(this.apiUrl, reporte).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    obtenerReportes(): Observable<ReporteDTO[]> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<ReporteDTO[]>(this.apiUrl).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    obtenerReportePorId(id: string): Observable<MensajeDTO<ReporteDTO>> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<MensajeDTO<ReporteDTO>>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    actualizarReporte(reporte: EditarReporteDto): Observable<MensajeDTO<ReporteDTO>> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.put<MensajeDTO<ReporteDTO>>(this.apiUrl, reporte).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    eliminarReporte(dto: EliminarReporteDto): Observable<MensajeDTO<string>> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.delete<MensajeDTO<string>>(this.apiUrl, { body: dto }).pipe(
            catchError(this.handleError.bind(this))
        );
    }

    marcarImportante(dto: MarcarReporteDto): Observable<MensajeDTO<string>> {
        this.loadingSubject.next(true);
        return this.http.post<MensajeDTO<string>>(`${this.apiUrl}/importante/marcar`, dto)
            .pipe(catchError(this.handleError.bind(this)));
    }

    quitarImportante(dto: MarcarReporteDto): Observable<MensajeDTO<string>> {
        this.loadingSubject.next(true);
        return this.http.post<MensajeDTO<string>>(`${this.apiUrl}/importante/quitar`, dto)
            .pipe(catchError(this.handleError.bind(this)));
    }

    marcarFavorito(dto: MarcarReporteDto): Observable<MensajeDTO<string>> {
        this.loadingSubject.next(true);
        return this.http.post<MensajeDTO<string>>(`${this.apiUrl}/favorito/marcar`, dto)
            .pipe(catchError(this.handleError.bind(this)));
    }

    quitarFavorito(dto: MarcarReporteDto): Observable<MensajeDTO<string>> {
        this.loadingSubject.next(true);
        return this.http.post<MensajeDTO<string>>(`${this.apiUrl}/favorito/quitar`, dto)
            .pipe(catchError(this.handleError.bind(this)));
    }

    marcarResuelto(dto: MarcarReporteDto): Observable<MensajeDTO<string>> {
        this.loadingSubject.next(true);
        return this.http.post<MensajeDTO<string>>(`${this.apiUrl}/resuelto/marcar`, dto)
            .pipe(catchError(this.handleError.bind(this)));
    }

    quitarResuelto(dto: MarcarReporteDto): Observable<MensajeDTO<string>> {
        this.loadingSubject.next(true);
        return this.http.post<MensajeDTO<string>>(`${this.apiUrl}/resuelto/quitar`, dto)
            .pipe(catchError(this.handleError.bind(this)));
    }

    obtenerHistorial(id: string): Observable<MensajeDTO<HistorialEstadoDTO[]>> {
        this.loadingSubject.next(true);
        return this.http.get<MensajeDTO<HistorialEstadoDTO[]>>(`${this.apiUrl}/${id}/historial`)
            .pipe(catchError(this.handleError.bind(this)));
    }

    gestionarReporte(dto: GestionReporteDto): Observable<MensajeDTO<string>> {
        this.loadingSubject.next(true);
        return this.http.post<MensajeDTO<string>>(`${this.apiUrl}/gestionar`, dto)
            .pipe(catchError(this.handleError.bind(this)));
    }

    obtenerReportesPorUbicacion(ubicacion: UbicacionDTO): Observable<MensajeDTO<ReporteDTO[]>> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.post<MensajeDTO<ReporteDTO[]>>(`${this.apiUrl}/ubicacion`, ubicacion)
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Ha ocurrido un error en la operación';
        
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = error.error?.message || errorMessage;
        }
        
        this.loadingSubject.next(false);
        this.errorSubject.next(errorMessage);
        return throwError(() => errorMessage);
    }
}