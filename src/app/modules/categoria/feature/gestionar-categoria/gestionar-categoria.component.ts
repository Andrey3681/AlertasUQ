import { Component, OnInit } from '@angular/core';
import { ActualizarCategoriaDTO, CrearCategoriaDTO, CategoriaDTO } from '../../../../interfaces/Categoria.interface';
import { CategoriaService } from '../../../../services/categoria.service';
import { MensajeDTO } from '../../../../interfaces/mensaje.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionar-categoria.component.html',
  styleUrl: './gestionar-categoria.component.css'
})
export class GestionarCategoriaComponent implements OnInit {
  categorias: CategoriaDTO[] = [];
  categoriaSeleccionada: CategoriaDTO | null = null;
  nombre: string = '';
  descripcion: string = '';
  mensaje: string = '';
  error: boolean = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (response: MensajeDTO<CategoriaDTO[]>) => {
        if (!response.error) {
          this.categorias = response.mensaje || []; // Cambiado de response.data a response.mensaje
          console.log('Categorías cargadas:', this.categorias);
        } else {
          this.mensaje = 'Error al obtener las categorías';
          this.error = true;
        }
      },
      error: (error) => {
        this.mensaje = 'Error al cargar las categorías';
        this.error = true;
        console.error('Error:', error);
      }
    });
}

  seleccionarCategoria(categoria: CategoriaDTO) {
    this.categoriaSeleccionada = categoria;
    this.nombre = categoria.nombre;
    this.descripcion = categoria.descripcion;
  }

  crearCategoria() {
    const nuevaCategoria: CrearCategoriaDTO = {
      nombre: this.nombre,
      descripcion: this.descripcion
    };

    this.categoriaService.crearCategoria(nuevaCategoria).subscribe({
      next: (response: MensajeDTO<string>) => {
    
        this.error = response.error;
        // Limpiar el formulario
        this.nombre = '';
        this.descripcion = '';
        // Aquí podrías actualizar la lista de categorías
        this.ngOnInit();
      },
      error: (error) => {
        this.mensaje = 'Error al crear la categoría';
        this.error = true;
        console.error('Error:', error);
      }
    });
  }

  actualizarCategoria() {
    if (this.categoriaSeleccionada) {
      const categoriaActualizada: ActualizarCategoriaDTO = {
        id: this.categoriaSeleccionada.id,
        nombre: this.nombre,
        descripcion: this.descripcion
      };

      this.categoriaService.actualizarCategoria(categoriaActualizada).subscribe({
        next: (response: MensajeDTO<void>) => {
          if (!response.error) {
            // Actualizar la categoría en la lista local
            const index = this.categorias.findIndex(c => c.id === this.categoriaSeleccionada?.id);
            if (index !== -1) {
              this.categorias[index] = { ...categoriaActualizada };
            }
            // Limpiar la selección
            this.categoriaSeleccionada = null;
            this.nombre = '';
            this.descripcion = '';
            this.mensaje = 'Categoría actualizada exitosamente';
            this.ngOnInit();
          } else {
            this.mensaje = 'Error al actualizar la categoría';
            this.error = true;
          }
        },
        error: (error) => {
          this.mensaje = 'Error al actualizar la categoría';
          this.error = true;
          console.error('Error:', error);
        }
      });
    }
}

  eliminarCategoria() {
    if (this.categoriaSeleccionada) {
      this.categoriaService.eliminarCategoria(this.categoriaSeleccionada.id.toString()).subscribe({
        next: (response: MensajeDTO<void>) => {
          if (!response.error) {
            // Eliminar la categoría de la lista local
            this.categorias = this.categorias.filter(c => c.id !== this.categoriaSeleccionada?.id);
            // Limpiar la selección
            this.categoriaSeleccionada = null;
            this.nombre = '';
            this.descripcion = '';
            this.mensaje = 'Categoría eliminada exitosamente';
            this.ngOnInit();
          } else {
            this.mensaje = 'Error al eliminar la categoría';
            this.error = true;
          }
        },
        error: (error) => {
          this.mensaje = 'Error al eliminar la categoría';
          this.error = true;
          console.error('Error:', error);
        }
      });
    }
}
}
