import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'usuario',
         loadChildren: () => import('./modules/usuario/usuario.routes').then(m => m.usuarioRoutes)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
