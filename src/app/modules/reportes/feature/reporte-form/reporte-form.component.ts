import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RegistrarReporteDto, EstadoSeveridad, CategoriaDTO } from '../../../../interfaces/reporte.interface';
import { MapsComponent } from '../../../maps/maps.component';
import { ReportesService } from '../../../../services/reportes.service';
import { TokenService } from '../../../../services/toker.service';
import { CategoriaService } from '../../../../services/categoria.service';
import Swal from 'sweetalert2';
import { ImagenService } from '../../../../services/image.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MapsComponent,
    RouterModule
  ],
  templateUrl: './reporte-form.component.html',
  styleUrls: ['./reporte-form.component.css']
})
export class ReportFormComponent implements OnInit {
  @ViewChild(MapsComponent) mapsComponent!: MapsComponent;
  reporteForm: FormGroup;
  loading = false;
  error: string | null = null;
  imagenPreview: string | null = null;
  fotos: string[] = [];
  categorias: CategoriaDTO[] = [];
  private marcadorSeleccionado: mapboxgl.Marker | null = null;

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private categoriaService: CategoriaService,
    private router: Router,
    private tokenService: TokenService,
    private imagenService: ImagenService 
  ) {
    this.reporteForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      categoria: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      ubicacion: this.fb.group({
        latitud: [null, Validators.required],
        longitud: [null, Validators.required],
        radio: [1000, Validators.required]
      }),
      imagen: [null]
    });
  }

  ngOnInit() {
    this.reportesService.loading$.subscribe(
      loading => this.loading = loading
    );

    this.reportesService.error$.subscribe(
      error => this.error = error
    );

    this.categoriaService.listarCategorias().subscribe({
      next: (response) => {
        if (!response.error && response.mensaje) {
          this.categorias = response.mensaje.map(categoria => ({
            id: categoria.id.toString(),
            nombre: categoria.nombre
          }));
        }
      },
      error: (error) => {
        this.error = 'Error al cargar las categorías';
        console.error(error);
      }
    });

    // Esperar a que el componente de mapa esté listo
    setTimeout(() => {
      this.configurarMapa();
    }, 1000);
  }

  private configurarMapa() {
    if (this.mapsComponent && this.mapsComponent.map) {
      // Definir el listener
      const clickListener = (e: mapboxgl.MapMouseEvent) => {
        if (this.marcadorSeleccionado) {
          this.marcadorSeleccionado.remove();
        }

        this.marcadorSeleccionado = new mapboxgl.Marker({ 
          color: '#FF0000',
          scale: 1.2
        })
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(this.mapsComponent.map);

        this.reporteForm.get('ubicacion')?.setValue({
          latitud: e.lngLat.lat,
          longitud: e.lngLat.lng,
          radio: 1000
        });
      };

      // Remover el listener específico
      this.mapsComponent.map.off('click', clickListener);
      // Agregar el nuevo listener
      this.mapsComponent.map.on('click', clickListener);
    }
  }

  onSubmit() {
    if (this.reporteForm.valid) {
      const formValue = this.reporteForm.value;
      
      // Verificar que se haya seleccionado una ubicación
      if (!formValue.ubicacion.latitud || !formValue.ubicacion.longitud) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, selecciona una ubicación en el mapa'
        });
        return;
      }

      const reporteDto: RegistrarReporteDto = {
        titulo: formValue.titulo,
        idUsuario: this.tokenService.getIdUsuario(), 
        ubicacion: {
          latitud: formValue.ubicacion.latitud,
          longitud: formValue.ubicacion.longitud,
          radio: formValue.ubicacion.radio,
        },
        categoria: this.categorias.find(cat => cat.id === formValue.categoria) || this.categorias[0],
        fotos: this.fotos,
        severidad: 'BAJA' as EstadoSeveridad
      };

      console.log('Enviando reporte:', reporteDto);

      this.reportesService.crearReporte(reporteDto).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Reporte creado exitosamente',
            timer: 2000,
            showConfirmButton: false
          });
          this.reporteForm.reset();
          this.imagenPreview = null;
          this.fotos = [];
          this.error = '';
          if (this.marcadorSeleccionado) {
            this.marcadorSeleccionado.remove();
            this.marcadorSeleccionado = null;
          }
          this.router.navigate(['/panel/reportes']);
        },
        error: (error) => {
          console.error('Error al crear el reporte:', error);
          this.error = 'Error al crear el reporte. Por favor, intente nuevamente.';
        }
      });
    } else {
      this.markFormGroupTouched(this.reporteForm);
    }
  }

  onCancel() {
    this.router.navigate(['/panel/reportes']);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (this.isValidImageFile(file)) {
        this.loading = true; // Opcional: para mostrar spinner
        this.imagenService.subirImagen(file).subscribe({
          next: (response) => {
  
            
            // Suponiendo que response.url es la URL de la imagen subida
            this.imagenPreview = response.mensaje;
            this.fotos.push(response.mensaje);
            this.reporteForm.patchValue({
              imagen: response.mensaje
            });
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Error al subir la imagen';
            console.log(err.error);
            console.log(err.mensaje);
            this.loading = false;
          }
        });
      } else {
        this.error = 'Por favor, seleccione un archivo de imagen válido (jpg, jpeg, png, gif)';
      }
    }
  }

  isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    return validTypes.includes(file.type);
  }

  // Utilidad para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getters para facilitar la validación en el template
  get tituloInvalid() {
    const control = this.reporteForm.get('titulo');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get categoriaInvalid() {
    const control = this.reporteForm.get('categoria');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get descripcionInvalid() {
    const control = this.reporteForm.get('descripcion');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get ubicacionInvalid() {
    const control = this.reporteForm.get('ubicacion');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  removeImage() {
    this.reporteForm.patchValue({
      imagen: null
    });
    this.imagenPreview = null;
    const fileInput = document.querySelector('#imagen') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}

