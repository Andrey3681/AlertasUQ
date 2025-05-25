import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteDTO } from '../../interfaces/reporte.interface';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-listar-all-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-all-reports.component.html',
  styleUrl: './listar-all-reports.component.css'
})
export class ListarAllReportsComponent implements OnInit {
  reportes: ReporteDTO[] = [];
  loading: boolean = false;
  error: string | null = null;
  reporteSeleccionado: ReporteDTO | null = null;
  filtroActual: string = 'sinVerificar';
  mostrarMotivoRechazo: boolean = false;
  motivoRechazo: string = '';

  constructor(private reporteService: ReportesService) {}

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    this.loading = true;
    this.error = null;
    this.reporteService.obtenerReportes().subscribe({
      next: (reportes) => {
        this.reportes = reportes;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  

  cambiarFiltro(filtro: string) {
    this.filtroActual = filtro;
    this.cargarReportes();
  }

  onReporteSeleccionado(reporte: ReporteDTO) {
    this.reporteSeleccionado = reporte;
  }

  verificarReporte() {
    // TODO: Implementar lógica de verificación
  }

  rechazarReporte() {
    this.mostrarMotivoRechazo = true;
  }

  confirmarRechazo() {
    // TODO: Implementar lógica de rechazo con motivo
  }

  eliminarReporte() {
    // TODO: Implementar lógica de eliminación
  }
}
