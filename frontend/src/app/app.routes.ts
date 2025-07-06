import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { authGuard } from '../core/interceptors/guards/auth.guard';
import { ProductsComponent } from './public/products/products.component';
import { CarritoComponent } from './public/carrito/carrito.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'productos',
    component: ProductsComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
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

