import { Component } from '@angular/core';
import { AlertBaseComponent } from '../components/alert-base/alert-base.component';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [AlertBaseComponent],
    template: `
        <app-alert-base
            [config]="alertConfig"
            (cerrar)="onAceptar()">
        </app-alert-base>
    `
})
export class UnauthorizedComponent {
    alertConfig = {
        tipo: 'error' as const,
        titulo: '¡ALERTA!',
        mensaje: [
            'Usted No Está Autorizado Para',
            'Hacer Algún Cambio.'
        ],
        botonTexto: 'ACEPTAR'
    };

    constructor(private alertService: AlertService) {}

    onAceptar(): void {
        this.alertService.cerrarAlerta();
    }
}
