import { Component, Input } from '@angular/core';
import { Zapatilla } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../api/services/carrito/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shoe',
  imports: [CommonModule, RouterModule],
  templateUrl: './shoe.component.html',
  styleUrl: './shoe.component.css',
})
export class ShoeComponent {
  @Input() zapatilla!: Zapatilla;

  agregandoAlCarrito = false;

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(event: Event, stockId: number): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.agregandoAlCarrito) return;

    this.agregandoAlCarrito = true;

    this.carritoService.agregarAlCarrito({ stockId, cantidad: 1 }).subscribe({
      next: (response) => {
        this.agregandoAlCarrito = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Agregado al carrito',
          showConfirmButton: false,
          timer: 1000,
          width: '20em',
          padding: '1em'
        });
      },
      error: (error) => {
        this.agregandoAlCarrito = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Tenes que iniciar sesión para agregar al carrito',
          showConfirmButton: false,
          timer: 2000,
          width: '20em',
          padding: '1em'
        });
      }
    });
  }

  obtenerPrimerStockDisponible(): number | null {
    const stockDisponible = this.zapatilla.stock?.find(s => s.activo && s.cantidad > 0);
    return stockDisponible ? stockDisponible.id : null;
  }

  tieneStockDisponible(): boolean {
    return this.obtenerPrimerStockDisponible() !== null;
  }
}
