import { Component, effect, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { NgIf } from '@angular/common';
import { AuthUsuarioService } from '../../api/services/usuario/auth-usuario.service';


@Component({
  selector: 'app-menu',
  imports: [RouterLink, ButtonModule, RouterOutlet, NgIf,DrawerModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit{

  cart: string= '/img/cart-1.svg'
  cart1: string= '/img/cart.svg'
  visible2: boolean = false;
  
private authService = inject(AuthUsuarioService);

  usuarioLogueado = this.authService.usuario;

   private usuarioEffect = effect(() => {
    console.log('Usuario:', this.usuarioLogueado());
  })
  
  ngOnInit(): void {
   
  }
}