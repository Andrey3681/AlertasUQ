import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ReporteDTO, EstadoReporte } from '../../interfaces/reporte.interface';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  map!: mapboxgl.Map;
  isBrowser: boolean;
  marker!: mapboxgl.Marker;
  marcadores: mapboxgl.Marker[] = [];
  posicionActual: [number, number] = [-75.67270, 4.53252];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.marcadores = [];
  }

  ngOnInit() {
    this.crearMapa();
  }

  crearMapa() {
    if (this.isBrowser) {
      this.map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoiYW5kcmV5MzY4MSIsImEiOiJjbWIyN3RxM2QwaGp0MmlvbHQ2ZTk2dndtIn0.kTusuBtD9u-1yWSmd-Mtsw',
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.posicionActual,
        zoom: 17
      });

      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true
        })
      );

      /*

      // Evento de clic para agregar marcadores
      this.map.on('click', (event) => {
        const coords = event.lngLat;
      
        if (this.marker) {
          this.marker.remove();
        }
      
        this.marker = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([coords.lng, coords.lat])
          .addTo(this.map);
      
        console.log('Coordenadas seleccionadas:', coords);

        // Crear círculo alrededor del marcador
        if (this.map.getSource('circle')) {
          this.map.removeLayer('circle-layer');
          this.map.removeSource('circle');
        }

        const circle = turf.circle([coords.lng, coords.lat], 1, {
          steps: 64,
          units: 'kilometers'
        });

        this.map.addSource('circle', {
          type: 'geojson',
          data: circle
        });

        this.map.addLayer({
          id: 'circle-layer',
          type: 'fill',
          source: 'circle',
          layout: {},
          paint: {
            'fill-color': '#a020f0',
            'fill-opacity': 0.3
          }
        });
      });
      */
     //this.agregarMarcador();
    }
  }

  // Método para agregar marcadores y obtener coordenadas
  // En MapsComponent
agregarMarcador(): Observable<{lat: number, lng: number}> {
  return new Observable<{lat: number, lng: number}>(observer => {
    this.map.once('click', (e: mapboxgl.MapMouseEvent) => {
      // Limpiar marcadores existentes
      this.marcadores.forEach(marcador => marcador.remove());
      this.marcadores = [];

      // Crear nuevo marcador
      const marcador = new mapboxgl.Marker({color: 'red'})
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(this.map);

      this.marcadores.push(marcador);

      // Devolver las coordenadas en el formato correcto
      const coords = {
        lat: e.lngLat.lat,
        lng: e.lngLat.lng
      };

      // Log para verificación
      console.log('Coordenadas del marcador:', coords);

      observer.next(coords);
      observer.complete();
    });
  });


  }

  // Método para pintar marcadores de reportes
  /*
  pintarMarcadores(reportes: ReporteDTO[]) {
    
    // Limpiar marcadores existentes
    this.marcadores.forEach(marcador => marcador.remove());
    this.marcadores = [];

    reportes.forEach(reporte => {
      // Verificar que el reporte tenga fotos antes de intentar acceder
      const fotoUrl = reporte.fotos && reporte.fotos.length > 0 ? reporte.fotos[0] : 'assets/images/no-image.png';
      
      const popupContent = `
        <div class="popup-content" style="max-width: 300px; padding: 10px;">
          <div style="margin-bottom: 10px;">
            <img src="${fotoUrl}" alt="${reporte.titulo}" 
                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;"
                 onerror="this.src='assets/images/no-image.png'">
          </div>
          <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #333;">${reporte.titulo}</h3>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <span style="background-color: ${this.getEstadoColor(reporte.estadoReporte)}; 
                         color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
              ${reporte.estadoReporte}
            </span>
            <span style="background-color: #4CAF50; color: white; 
                         padding: 4px 8px; border-radius: 4px; font-size: 12px;">
              ${reporte.categoria?.nombre || 'Sin categoría'}
            </span>
          </div>
        </div>
      `;

      const marcador = new mapboxgl.Marker({color: 'red'})
        .setLngLat([reporte.ubicacion.longitud, reporte.ubicacion.latitud])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
        .addTo(this.map);

      this.marcadores.push(marcador);
    });
  }
  */
  // Método para obtener el color según el estado
  private getEstadoColor(estado: EstadoReporte): string {
    const colores: Record<EstadoReporte, string> = {
      [EstadoReporte.PENDIENTE]: '#FFA500',
      [EstadoReporte.VERIFICADO]: '#4CAF50',
      [EstadoReporte.ELIMINADO]: '#FF0000',
      [EstadoReporte.RECHAZADO]: '#FF0000',
      [EstadoReporte.RESUELTO]: '#4CAF50',
      [EstadoReporte.NO_RESUELTO]: '#FF0000'
    };
    return colores[estado] || '#808080';
  }

}