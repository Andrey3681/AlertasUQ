import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Reporte {
  titulo: string;
  usuario: string;
  imagen: string;
  fecha: string;
  ubicacion: string;
  hora: string;
  descripcion: string;
  comentarios: number;
  recompensa?: string;
}

@Component({
  selector: 'app-report-favorite',
  templateUrl: './report-favorite.component.html',
  styleUrls: ['./report-favorite.component.css'],
  imports: [CommonModule]
})
export class ReportFavoriteComponent {
  reportes: Reporte[] = [
    {
      titulo: '¡Cuidado! Hoy Robaron A Una Anciana En El Barrio Hernandez !!!!!',
      usuario: '@Maria1234',
      imagen: 'https://i.imgur.com/8Q1Z2Qp.jpg',
      fecha: '18/01/2023',
      ubicacion: 'Calle 13 Con Carrera 21, Barrio Hernandez',
      hora: '8:00 AM',
      descripcion: 'mucha inseguridad >:(',
      comentarios: 10
    },
    {
      titulo: '¡Mascota Perdida Por El Barrio Chino! :(',
      usuario: '@Maria1234',
      imagen: 'https://i.imgur.com/1bX5QH6.jpg',
      fecha: '',
      ubicacion: '',
      hora: '',
      descripcion: 'Gato anaranjado perdido cerca del restaurante de comida china en el Barrio Chino. Cualquier información al siguiente número: 32345662',
      comentarios: 4500,
      recompensa: "Recompensa De 1'000,000,000"
    }
  ];
}