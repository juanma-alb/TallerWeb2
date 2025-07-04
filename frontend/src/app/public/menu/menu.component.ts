// src/app/modules/usuario/components/menu/menu.component.ts
import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

import { AuthUsuarioService } from '../../api/services/usuario/auth-usuario.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, DrawerModule, ButtonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  cart  = '/img/cart-1.svg';
  cart1 = '/img/cart.svg';
  visible2 = false;

  private auth   = inject(AuthUsuarioService);
  private router = inject(Router);

  /** signal con el usuario o null */
  usuarioLogueado = this.auth.usuario;

  /** efecto solo para debug */
  private usuarioEffect = effect(() => {
    console.log('Usuario:', this.usuarioLogueado());
  });

  /** cierra sesión y redirige al home */
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
