import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AlertConfig {
    tipo: 'success' | 'warning' | 'error' | 'info';
    titulo: string;
    mensaje: string | string[];
    botonTexto?: string;
    onBotonClick?: () => void;
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private alertSubject = new BehaviorSubject<AlertConfig | null>(null);
    alert$ = this.alertSubject.asObservable();

    mostrarAlerta(config: AlertConfig): void {
        this.alertSubject.next(config);
    }

    cerrarAlerta(): void {
        this.alertSubject.next(null);
    }

    // Métodos de utilidad para casos comunes
    mostrarExito(mensaje: string | string[], titulo = '¡ÉXITO!'): void {
        this.mostrarAlerta({
            tipo: 'success',
            titulo,
            mensaje,
            botonTexto: 'ACEPTAR'
        });
    }

    mostrarError(mensaje: string | string[], titulo = '¡ERROR!'): void {
        this.mostrarAlerta({
            tipo: 'error',
            titulo,
            mensaje,
            botonTexto: 'CERRAR'
        });
    }

    mostrarAdvertencia(mensaje: string | string[], titulo = '¡ATENCIÓN!'): void {
        this.mostrarAlerta({
            tipo: 'warning',
            titulo,
            mensaje,
            botonTexto: 'ENTENDIDO'
        });
    }

    mostrarNoAutorizado(): void {
        this.mostrarAlerta({
            tipo: 'error',
            titulo: '¡ALERTA!',
            mensaje: ['Usted No Está Autorizado Para', 'Hacer Algún Cambio.'],
            botonTexto: 'ACEPTAR'
        });
    }
} 