import { Routes } from '@angular/router';
import { ReportFormComponent } from './reporte-form/reporte-form.component';
import { TarjetaReportComponent } from './publicacion/tarjeta-report/tarjeta-report.component';
import { ReportFavoriteComponent } from './report-favorite/report-favorite.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
export const REPORTES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'crear',
        component: ReportFormComponent
      },
      {
        path: 'reportes-guardados',
        component: ReportFavoriteComponent
      },
      {
        path: 'mis-reportes',
        component: MyReportsComponent
      },
      {
        path: '',
        redirectTo: 'crear',
        pathMatch: 'full'
      },
      {
        path: 'reporte/:id',
        component: TarjetaReportComponent
      }
    ]
  }
]; 