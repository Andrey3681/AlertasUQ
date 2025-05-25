import { Component } from '@angular/core';
import { AlertBaseComponent } from '../components/alert-base/alert-base.component';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-alert-recuperar-password',
    standalone: true,
    imports: [AlertBaseComponent],
    template: `
        <app-alert-base
            [config]="alertConfig"
            (cerrar)="onRegresar()">
        </app-alert-base>
    `
})
export class AlertRecuperarPasswordComponent {
    alertConfig = {
        tipo: 'info' as const,
        titulo: '¡ALERTA!',
        mensaje: [
            'Hemos Enviado A Su Correo Electrónico',
            'Los Pasos Para Reestablecer Su Contraseña Olvidada!'
        ],
        botonTexto: 'REGRESAR'
    };

    constructor(
        private router: Router,
        private alertService: AlertService
    ) {}

    onRegresar(): void {
        this.alertService.cerrarAlerta();
        this.router.navigate(['/login']);
    }
}
