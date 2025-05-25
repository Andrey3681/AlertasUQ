import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';
import { ReporteDTO, EstadoReporte } from '../interfaces/reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  /*
  private mapa: Map | null = null;
  private marcadores: mapboxgl.Marker[] = [];
  private posicionActual: LngLatLike = [-75.67270, 4.53252];

  constructor() {
    this.marcadores = [];
  }

  public crearMapa(): void {
    if (this.mapa) {
      console.warn('El mapa ya está inicializado');
      return;
    }

    try {
      this.mapa = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoiYW5kcmV5MzY4MSIsImEiOiJjbTl3eTV5azYwaDV1MnFwcXoxZzN4bG1xIn0.tAre10wxSnlaPD02XiTV1g',
        container: 'map',
        style: 'mapbox://styles/mapbox/standard',
        center: this.posicionActual,
        pitch: 45,
        zoom: 17
      });

      this.mapa.addControl(new mapboxgl.NavigationControl());
      this.mapa.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true
        })
      );

      // Esperar a que el mapa esté cargado antes de continuar
      this.mapa.on('load', () => {
        console.log('Mapa cargado correctamente');
      });

    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }
  }

  public agregarMarcador(): Observable<any> {
    if (!this.mapa) {
      throw new Error('El mapa no está inicializado');
    }

    return new Observable<any>(observer => {
      this.mapa!.on('click', (e: mapboxgl.MapMouseEvent) => {
        this.marcadores.forEach(marcador => marcador.remove());
        this.marcadores = [];

        const marcador = new mapboxgl.Marker({color: 'red'})
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(this.mapa!);

        this.marcadores.push(marcador);
        observer.next(marcador.getLngLat());
      });
    });
  }

  public pintarMarcadores(reportes: ReporteDTO[]): void {
    if (!this.mapa) {
      throw new Error('El mapa no está inicializado');
    }

    // Limpiar marcadores existentes
    this.marcadores.forEach(marcador => marcador.remove());
    this.marcadores = [];

    reportes.forEach(reporte => {
      const popupContent = `
        <div class="popup-content" style="max-width: 300px; padding: 10px;">
          <div style="margin-bottom: 10px;">
            <img src="${reporte.fotos[0]}" alt="${reporte.titulo}" 
                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
          </div>
          <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #333;">${reporte.titulo}</h3>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <span style="background-color: ${this.getEstadoColor(reporte.estadoReporte)}; 
                         color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
              ${reporte.estadoReporte}
            </span>
            <span style="background-color: #4CAF50; color: white; 
                         padding: 4px 8px; border-radius: 4px; font-size: 12px;">
              ${reporte.categoria.nombre}
            </span>
          </div>
        </div>
      `;

      const marcador = new mapboxgl.Marker({color: 'red'})
        .setLngLat([reporte.ubicacion.longitud, reporte.ubicacion.latitud])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
        .addTo(this.mapa!);

      this.marcadores.push(marcador);
    });
  }

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

  */

  private mapa: mapboxgl.Map | null = null;
 marcadores: any[];
 posicionActual: LngLatLike;


 constructor() {
   this.marcadores = [];
   this.posicionActual = [-75.67270, 4.53252];
 }


 public crearMapa(): void {
  if (this.mapa) {
    console.warn('El mapa ya está inicializado');
    return;
  }

  this.mapa = new mapboxgl.Map({
    accessToken: 'pk.eyJ1IjoiYW5kcmV5MzY4MSIsImEiOiJjbWIyN3RxM2QwaGp0MmlvbHQ2ZTk2dndtIn0.kTusuBtD9u-1yWSmd-Mtsw',
    container: 'mapa',  // <- ID correcto
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-75.67270, 4.53252],
    zoom: 17
  });

  this.mapa.addControl(new mapboxgl.NavigationControl());
  this.mapa.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    })
  );

   

 }


 public agregarMarcador(): Observable<any> {


   const mapaGlobal = this.mapa;
   const marcadores = this.marcadores;


   return new Observable<any>(observer => {


     mapaGlobal?.on('click', function (e: any) {
       marcadores.forEach(marcador => marcador.remove());


       const marcador = new mapboxgl.Marker({color: 'red'})
         .setLngLat([e.lngLat.lng, e.lngLat.lat])
         .addTo(mapaGlobal);


       marcadores.push(marcador);
       observer.next(marcador.getLngLat());
     });
   });


 }


 public pintarMarcadores(reportes: ReporteDTO[]) {


   reportes.forEach(reporte => {
     new mapboxgl.Marker({color: 'red'})
       .setLngLat([reporte.ubicacion.longitud, reporte.ubicacion.latitud])
       .setPopup(new mapboxgl.Popup().setHTML(reporte.titulo))
       .addTo(this.mapa!);
   });


 }

}
