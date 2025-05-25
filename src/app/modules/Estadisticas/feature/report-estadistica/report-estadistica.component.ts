import { Component, OnInit } from '@angular/core';
import { MapsComponent } from '../../../maps/maps.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensajeDTO } from '../../../../interfaces/mensaje.interface';
import { CategoriaDTO } from '../../../../interfaces/Categoria.interface';
import { CategoriaService } from '../../../../services/categoria.service';
@Component({
  selector: 'app-report-estadistica',
  templateUrl: './report-estadistica.component.html',
  styleUrls: ['./report-estadistica.component.css'],
  imports: [CommonModule, MapsComponent, FormsModule]
})  
export class ReportEstadisticaComponent implements OnInit {
  fechaSeleccionada: string = '';
  categorias: string[] = [];
  severidades: string[] = [];
  categoriaSeleccionada: string = '';
  severidadSeleccionada: string = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    // Simulación: reemplaza esto por una llamada HTTP real
    
    this.cargarCategorias();
    this.severidades = ['Alta', 'Media', 'Baja'];
  }

  cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (response: MensajeDTO<CategoriaDTO[]>) => {
        if (!response.error && response.mensaje) {
          // Extraer solo los nombres de las categorías
          this.categorias = response.mensaje.map(categoria => categoria.nombre);
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  onFechaChange(event: any) {
    this.fechaSeleccionada = event.target.value;
  }

  onCategoriaChange(event: any) {
    this.categoriaSeleccionada = event.target.value;
  }

  onSeveridadChange(event: any) {
    this.severidadSeleccionada = event.target.value;
  }
}