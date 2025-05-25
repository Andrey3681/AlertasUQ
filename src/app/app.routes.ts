import { Routes } from '@angular/router';
import { BaseComponent } from './shared/layout/base/base.component';
import { NotificationListComponent } from './modules/notificaciones/feature/notification-list/notification-list.component';
import { ReportEstadisticaComponent } from './modules/Estadisticas/feature/report-estadistica/report-estadistica.component';
import { InicioUsuarioComponent } from './modules/inicio-usuario/inicio-usuario.component';
import { CATEGORIA_ROUTES } from './modules/categoria/feature/categoria.routes';
import { ListarAllReportsComponent } from './modules/listar-all-reports/listar-all-reports.component';
import { RoleGuard } from './guards/role.service';
export const routes: Routes = [
    
    // rutas publicas 
    {
        path:'login',
        loadChildren:() => import('./modules/auth/auth.routes')
    },
    {
       path: 'activar-cuenta',
       loadComponent:() => import('./modules/auth/activar-cuenta/activar-cuenta.component').then(m=>m.ActivarCuentaComponent)
    },
    {
        path: 'recuperar-password',
        loadComponent:() => import('./modules/auth/recuperar-password/recuperar-password.component').then(m=>m.RecuperarPasswordComponent)
    },
    {
        path:'panel',
        loadComponent:() => import('./shared/layout/base/base.component').then(m=>BaseComponent),
        children:[
            {
                path:'inicio-usuario',
                loadComponent:() => import('./modules/inicio-usuario/inicio-usuario.component').then(m => InicioUsuarioComponent),
                canActivate: [RoleGuard],
                data: { roles: ['ROLE_USUARIO'] }
            },
            {
                path:'notifications',
                loadComponent:() => import('./modules/notificaciones/feature/notification-list/notification-list.component').then(m => NotificationListComponent),
                canActivate: [RoleGuard],
                data: { roles: ['ROLE_USUARIO','ROLE_MODERADOR'] }
            },
            {
                path:'reportes',
                loadChildren:() => import('./modules/reportes/feature/reportes.routes').then(m => m.REPORTES_ROUTES),
                canActivate: [RoleGuard],
                data: { roles: ['ROLE_USUARIO'] }
            },
            {
                path:'user',
                loadChildren:() => import('./modules/user/user.routes').then(m => m.userRoutes),
                canActivate: [RoleGuard],
                data: { roles: ['ROLE_USUARIO','ROLE_MODERADOR'] }
            },
            {
                path:'estadisticas',
                loadComponent:() => import('./modules/Estadisticas/feature/report-estadistica/report-estadistica.component').then(m => ReportEstadisticaComponent),
                canActivate: [RoleGuard],
                data: { roles: ['ROLE_MODERADOR'] }
            },
            {
                path:'categoria',
                loadChildren:() => import('./modules/categoria/feature/categoria.routes').then(m => CATEGORIA_ROUTES),
                canActivate: [RoleGuard],
                data: { roles: ['ROLE_MODERADOR'] }
            },
            {
                path:'listarAllReportes',
                loadComponent:() => import('./modules/listar-all-reports/listar-all-reports.component').then(m => ListarAllReportsComponent),
                canActivate: [RoleGuard],
                data: { roles: ['ROLE_MODERADOR'] }
            },
            {
                path: '',
                redirectTo: 'inicio-usuario',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'listarAllReportes'
            }
        ]
    },
    {
        path:'**',
        redirectTo:'login'
    }
    
];
