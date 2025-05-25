import { Routes } from "@angular/router"

export default [
    {
        path: '',
        loadComponent: () => import('./contaioner-auth/contaioner-auth.component').then(m => m.ContaionerAuthComponent)
    }

] as Routes;