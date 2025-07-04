import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { authGuard } from '../core/interceptors/guards/auth.guard';
          

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./modules/usuario/usuario.routes').then(m => m.usuarioRoutes)
  },
  /*{
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/usuario/pages/perfil/perfil.component')
        .then(m => m.PerfilComponent)
  },*/
  {
    path: '**',
    redirectTo: ''
  }
];

