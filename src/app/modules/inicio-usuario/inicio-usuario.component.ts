// src/app/modules/inicio-usuario/inicio-usuario.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapsComponent } from '../maps/maps.component';
import { ReportesService } from '../../services/reportes.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-inicio-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule, MapsComponent],
  templateUrl: './inicio-usuario.component.html',
  styleUrl: './inicio-usuario.component.css'
})
export class InicioUsuarioComponent implements OnInit {
  @ViewChild(MapsComponent) mapsComponent!: MapsComponent;
  private watchId: number | null = null;
  private marcadorActual: mapboxgl.Marker | null = null;
  private marcadorReporte: mapboxgl.Marker | null = null;

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.iniciarSeguimientoUbicacion();
  }

  ngOnDestroy() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
    if (this.marcadorActual) {
      this.marcadorActual.remove();
    }
    if (this.marcadorReporte) {
      this.marcadorReporte.remove();
    }
  }

  private iniciarSeguimientoUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Posición actual:", position.coords.latitude, position.coords.longitude);
          this.actualizarUbicacion(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          this.actualizarUbicacion(4.53252, -75.67270);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.actualizarUbicacion(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error en el seguimiento de ubicación:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.error('Geolocalización no soportada en este navegador');
    }
  }

  private actualizarUbicacion(latitud: number, longitud: number) {
    if (this.mapsComponent && this.mapsComponent.map) {
      // Remover marcador de ubicación anterior si existe
      if (this.marcadorActual) {
        this.marcadorActual.remove();
      }

      // Crear nuevo marcador para ubicación actual
      this.marcadorActual = new mapboxgl.Marker({ 
        color: '#FF0000',
        scale: 1.2
      })
        .setLngLat([longitud, latitud])
        .addTo(this.mapsComponent.map);

      // Centrar el mapa en la ubicación actual
      this.mapsComponent.map.setCenter([longitud, latitud]);
      this.mapsComponent.map.setZoom(15);

      // Cargar reporte por defecto cerca de la ubicación actual
      this.cargarReportePorDefecto(latitud, longitud);
    }
  }

  private cargarReportePorDefecto(latitud: number, longitud: number) {
    const idReporteDefecto = '68322a575e54e0673ab3a3a3';
    this.reportesService.obtenerReportePorId(idReporteDefecto).subscribe({
      next: (response) => {
        if (response.mensaje && this.mapsComponent) {
          const reporte = response.mensaje;
          
          // Remover marcador de reporte anterior si existe
          if (this.marcadorReporte) {
            this.marcadorReporte.remove();
          }

          // Crear el contenido del popup
          const popupContent = `
            <div class="card" style="max-width: 300px;">
              <img src="${reporte.fotos && reporte.fotos.length > 0 ? reporte.fotos[0] : 'assets/images/no-image.png'}" 
                   class="card-img-top" 
                   alt="${reporte.titulo}"
                   style="height: 180px; object-fit: cover;"
                   onerror="this.src='assets/images/no-image.png'">
              <div class="card-body">
                <h5 class="card-title">${reporte.titulo}</h5>
                <div class="d-flex gap-2 mb-2">
                  <span class="badge bg-warning text-dark">
                    ${reporte.estadoReporte}
                  </span>
                  <span class="badge bg-success">
                    ${reporte.categoria?.nombre || 'Sin categoría'}
                  </span>
                </div>
              </div>
            </div>
          `;

          // Crear marcador para el reporte cerca de la ubicación actual
          const latitudReporte = latitud + 0.001; // Añadir un pequeño offset
          const longitudReporte = longitud + 0.001;
          
          this.marcadorReporte = new mapboxgl.Marker({ 
            color: '#4CAF50',
            scale: 1.2
          })
            .setLngLat([longitudReporte, latitudReporte])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
            .addTo(this.mapsComponent.map);
        }
      },
      error: (error) => {
        console.error('Error al cargar el reporte por defecto:', error);
      }
    });
  }
}