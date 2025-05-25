import { Routes } from '@angular/router';
import { GestionarCategoriaComponent } from './gestionar-categoria/gestionar-categoria.component';

export const CATEGORIA_ROUTES: Routes = [
  {
    path: 'listar',
    component: GestionarCategoriaComponent
  }
];