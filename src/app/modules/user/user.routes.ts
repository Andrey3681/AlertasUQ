import { Routes } from '@angular/router';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
export const userRoutes: Routes = [
  {

    path: '',
    children: [
      {
        path: 'ver',
        component: VerPerfilComponent
      },
    ]
   
  }
];
  
  
  /*    path: '',
    children: [
      {
        path: '',
        redirectTo: 'ver',
        pathMatch: 'full'
      },
      {
        path: 'ver',
        component: VerCuentaComponent
      },
      {
        path: 'editar',
        component: EditarCuentaComponent
      },
      {
        path: 'cambiar-contrasena',
        component: ChangePasswordComponent
      },
      {
        path: 'eliminar-cuenta',
        component: ElimarCuentaComponent
      }
    ]
  
]; */