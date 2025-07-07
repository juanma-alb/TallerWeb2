import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { ProductsComponent } from './public/products/products.component';
import { CarritoComponent } from './public/carrito/carrito.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

   {
    path: 'productos/:id',
    loadComponent: () =>
      import('./public/product-detail/product-detail.component') 
        .then(m => m.ProductDetailComponent)
  },


  { path: 'productos', component: ProductsComponent },

  {
    path: 'carrito',
    component: CarritoComponent
  },

  {
    path: 'usuario',
    loadChildren: () =>
      import('./modules/usuario/usuario.routes').then(m => m.usuarioRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

