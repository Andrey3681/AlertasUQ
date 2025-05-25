import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../services/toker.service';
import { ReporteDTO, EliminarReporteDto } from '../../../../interfaces/reporte.interface';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReportesService } from '../../../../services/reportes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-reports.component.html',
  styleUrl: './my-reports.component.css'
})
export class MyReportsComponent implements OnInit {
  reportes: ReporteDTO[] = [];
  loading = false;
  error: string | null = null;
  reporteSeleccionado: ReporteDTO | null = null;
  password: string = '';

  constructor(
    private userService: UserService,
    private reportesService: ReportesService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    this.loading = true;
    const idUsuario = this.tokenService.getIdUsuario();
    
    if (!idUsuario) {
      this.error = 'No se pudo obtener el ID del usuario';
      this.loading = false;
      return;
    }

    this.userService.obtenerReportesUsuario(idUsuario).subscribe({
      next: (response) => {
        this.reportes = response.mensaje as ReporteDTO[];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los reportes';
        this.loading = false;
        console.error('Error al cargar reportes:', err);
      }
    });
  }

  onReporteSeleccionado(reporte: ReporteDTO) {
    this.reporteSeleccionado = reporte;
  }

  eliminarReporte() {
    if (!this.reporteSeleccionado) {
      this.snackBar.open('Por favor seleccione un reporte para eliminar', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    if (!this.password) {
      this.snackBar.open('Por favor ingrese su contraseña', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    if (confirm('¿Está seguro que desea eliminar este reporte? Esta acción no se puede deshacer.')) {
      this.loading = true;
      
      const eliminarDto: EliminarReporteDto = {
        idReporte: this.reporteSeleccionado.id, // Aseguramos que se use el ID del reporte, no del usuario
        password: this.password
      };
      
      this.reportesService.eliminarReporte(eliminarDto).subscribe({
        next: (response) => {
          this.snackBar.open('Reporte eliminado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          
          // Actualizar la lista de reportes
          this.reportes = this.reportes.filter(r => r.id !== this.reporteSeleccionado?.id);
          this.reporteSeleccionado = null;
          this.password = '';
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al eliminar el reporte';
          this.loading = false;
          console.error('Error al eliminar reporte:', err);
          
          this.snackBar.open('Error al eliminar el reporte', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}