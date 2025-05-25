import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tarjeta-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarjeta-report.component.html',
  styleUrl: './tarjeta-report.component.css'
})
export class TarjetaReportComponent {
  @Input() reporteId!: string;
  @Input() titulo!: string;
  @Input() estado!: string;
  @Input() categoria!: string;
  @Input() severidad!: string;
  mostrarComentarios = false;

  toggleComentarios() {
    this.mostrarComentarios = !this.mostrarComentarios;
  }

  getEstadoClass(estado: string): string {
    switch(estado.toLowerCase()) {
      case 'activo': return 'bg-success';
      case 'en proceso': return 'bg-warning';
      case 'resuelto': return 'bg-info';
      case 'urgente': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getSeveridadClass(severidad: string): string {
    switch(severidad.toLowerCase()) {
      case 'alta': return 'text-danger';
      case 'media': return 'text-warning';
      case 'baja': return 'text-info';
      default: return 'text-secondary';
    }
  }
}