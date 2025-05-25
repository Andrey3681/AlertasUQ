import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertConfig } from '../../services/alert.service';

@Component({
    selector: 'app-alert-base',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="alert-container" [ngClass]="getContainerClass()">
            <div class="alert-header rounded-top p-3 text-center" [ngClass]="getHeaderClass()">
                <h5 class="alert-title text-white fw-bold mb-0">{{ config.titulo }}</h5>
            </div>
            <div class="alert-body bg-light p-4 text-center">
                <ng-container *ngIf="isArray(config.mensaje); else singleMessage">
                    <p *ngFor="let linea of config.mensaje" class="mb-3 fw-bold">{{ linea }}</p>
                </ng-container>
                <ng-template #singleMessage>
                    <p class="mb-3 fw-bold">{{ config.mensaje }}</p>
                </ng-template>
                <button 
                    class="btn rounded-pill px-4 py-2 fw-bold"
                    [ngClass]="getButtonClass()"
                    (click)="onButtonClick()">
                    {{ config.botonTexto || 'ACEPTAR' }}
                </button>
            </div>
        </div>
    `,
    styles: [`
        .alert-container {
            max-width: 400px;
            margin: 20px auto;
            border: 2px solid;
            border-radius: 15px;
            overflow: hidden;
            background-color: #f9f9f9;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .alert-container.success { border-color: #20c997; }
        .alert-container.warning { border-color: #fca652; }
        .alert-container.error { border-color: #dc3545; }
        .alert-container.info { border-color: #0dcaf0; }

        .alert-header.success { background-color: #20c997; }
        .alert-header.warning { background-color: #fca652; }
        .alert-header.error { background-color: #dc3545; }
        .alert-header.info { background-color: #0dcaf0; }

        .btn.success { 
            background-color: #20c997;
            color: white;
        }
        .btn.warning { 
            background-color: #fca652;
            color: white;
        }
        .btn.error { 
            background-color: #dc3545;
            color: white;
        }
        .btn.info { 
            background-color: #0dcaf0;
            color: white;
        }

        .btn:hover {
            opacity: 0.9;
        }

        p {
            font-size: 1.1rem;
        }
    `]
})
export class AlertBaseComponent {
    @Input() config!: AlertConfig;
    @Output() cerrar = new EventEmitter<void>();

    isArray(mensaje: string | string[]): mensaje is string[] {
        return Array.isArray(mensaje);
    }

    getContainerClass(): string {
        return this.config.tipo;
    }

    getHeaderClass(): string {
        return this.config.tipo;
    }

    getButtonClass(): string {
        return this.config.tipo;
    }

    onButtonClick(): void {
        if (this.config.onBotonClick) {
            this.config.onBotonClick();
        }
        this.cerrar.emit();
    }
} 