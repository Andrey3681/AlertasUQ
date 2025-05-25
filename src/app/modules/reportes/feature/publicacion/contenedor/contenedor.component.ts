import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraInferiorComponent } from '../barra-inferior/barra-inferior.component';
import { TarjetaReportComponent } from '../tarjeta-report/tarjeta-report.component';
import { AcordionComponent } from '../acordion/acordion.component';

import { 
    ReporteDTO, 
    EstadoReporte, 
    EstadoSeveridad,
    UbicacionDTO,
    ComentarioDTO 
} from '../../../../../interfaces/reporte.interface';
import { ReportesService } from '../../../../../services/reportes.service';


@Component({
  selector: 'app-contenedor',
  standalone: true,
  imports: [
    CommonModule,
    TarjetaReportComponent,
    AcordionComponent,
    BarraInferiorComponent
  ],
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.css'
})
export class ContenedorComponent implements OnInit {
  @Input() reporte!: ReporteDTO;
  loading: boolean = false;
  error: string | null = null;

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte() {
    this.loading = true;
    this.reportesService.obtenerReportePorId(this.reporte.id).subscribe({
      next: (response) => {
        if (response.mensaje) {
          this.reporte = response.mensaje;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar el reporte:', error);
        this.error = 'Error al cargar el reporte';
        this.loading = false;
      }
    });
  }

  // Método helper para verificar si el reporte está resuelto
  esResuelto(): boolean {
    return this.reporte?.resuelto === EstadoReporte.RESUELTO;
  }



  // Método para obtener el total de comentarios incluyendo respuestas
  getTotalComentarios(): number {
    if (!this.reporte?.comentarios) return 0;
    
    const contarComentarios = (comentarios: ComentarioDTO[]): number => {
      return comentarios.reduce((total, comentario) => {
        return total + 1 + (comentario.comentarios ? contarComentarios(comentario.comentarios) : 0);
      }, 0);
    };

    return contarComentarios(this.reporte.comentarios);
  }

  // Método para formatear la fecha del comentario
  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleString();
  }

  // Método para obtener el estado del reporte en formato legible
  getEstadoLegible(estado: EstadoReporte): string {
    const estados: { [key in EstadoReporte]: string } = {
      [EstadoReporte.PENDIENTE]: 'Pendiente',
      [EstadoReporte.VERIFICADO]: 'Verificado',
      [EstadoReporte.ELIMINADO]: 'Eliminado',
      [EstadoReporte.RECHAZADO]: 'Rechazado',
      [EstadoReporte.RESUELTO]: 'Resuelto',
      [EstadoReporte.NO_RESUELTO]: 'No Resuelto'
    };
    return estados[estado] || estado;
  }

  // Método para obtener la severidad en formato legible
  getSeveridadLegible(severidad: EstadoSeveridad): string {
    const severidades: { [key in EstadoSeveridad]: string } = {
      [EstadoSeveridad.BAJA]: 'Baja',
      [EstadoSeveridad.MEDIA]: 'Media',
      [EstadoSeveridad.ALTA]: 'Alta'
    };
    return severidades[severidad] || severidad;
  }
} 