import { Component } from '@angular/core';
import { AlertBaseComponent } from '../components/alert-base/alert-base.component';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-alert-change-password-recuperada-correctamente',
    standalone: true,
    imports: [AlertBaseComponent],
    template: `
        <app-alert-base
            [config]="alertConfig"
            (cerrar)="onContinuar()">
        </app-alert-base>
    `
})
export class AlertChangePasswordRecuperadaCorrectamenteComponent {
    alertConfig = {
        tipo: 'success' as const,
        titulo: '¡ATENCIÓN!',
        mensaje: [
            'Su Contraseña Ha Sido',
            'Cambiada Correctamente'
        ],
        botonTexto: 'CONTINUAR'
    };

    constructor(
        private router: Router,
        private alertService: AlertService
    ) {}

    onContinuar(): void {
        this.alertService.cerrarAlerta();
        this.router.navigate(['/login']);
    }
}
