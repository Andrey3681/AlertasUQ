import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acordion.component.html',
  styleUrls: ['./acordion.component.css']
})
export class AcordionComponent {
  @Input() imagenes: string[] = [];
  imagenActiva: number = 0;

  cambiarImagen(index: number) {
    this.imagenActiva = index;
  }
}