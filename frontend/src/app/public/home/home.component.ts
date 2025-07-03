import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-home',
  imports: [GalleriaModule, RouterLink, CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  sendIcon: string= '/img/iconSend.png'
  pagoIcon: string= '/img/iconPago.png' 
  segurityIcon: string= '/img/segurityIcon.png'
  hombre: string= '/img/hombre.webp'
  mujer: string= '/img/mujer.webp'
  ninio: string= '/img/ninio.webp'
  descatacado1: string= '/img/destacado-1.jpg'
  descatacado2: string= '/img/destacado-2.jpg'
  descatacado3: string= '/img/destacado-3.jpg'



   images: any[] = [
    {
      itemImageSrc: '/img/hero-img.webp',
      thumbnailImageSrc: 'img/hero-img-thumb.webp',
      alt: 'Zapatilla 1',
      title: 'Modelo Urbano 1'
    },
    {
      itemImageSrc: '/img/hero-img-1.webp',
      thumbnailImageSrc: 'img/hero-img-1-thumb.webp',
      alt: 'Zapatilla 2',
      title: 'Modelo Urbano 2'
    },
    {
      itemImageSrc: '/img/hero-img-3.webp',
      thumbnailImageSrc: 'img/hero-img-3-thumb.webp',
      alt: 'Zapatilla 3',
      title: 'Modelo Urbano 3'
    },
    // Agregá más si querés
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
}
