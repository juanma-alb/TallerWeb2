// src/app/public/product-detail/product-detail.component.ts
import { Component, OnInit, inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';
import { Stock, Zapatilla } from '../../../interfaces';
import { ButtonModule } from 'primeng/button';
import { CarritoService } from '../../api/services/carrito/carrito.service';
import Swal from 'sweetalert2';

/* ► extras para funcionar dentro de un DynamicDialog */
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector   : 'app-product-detail',
  standalone : true,
  imports    : [CommonModule, NgIf, NgFor, ButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrls  : ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  /* inyectamos siempre */
  private route   = inject(ActivatedRoute);
  private http    = inject(HttpClient);
  private carrito = inject(CarritoService);

  /* inyectables solo presentes cuando estamos dentro de un diálogo */
  constructor(
  @Optional() private dialogConfig: DynamicDialogConfig,
  @Optional() public  dialogRef  : DynamicDialogRef,
){}

  // ---------------------------------------------------------------------

  selectedStock?: Stock;
  agregando     = false;

  zapatilla?: Zapatilla;
  loading   = true;
  errorMsg  = '';

  /* --------------------------- life-cycle --------------------------- */
  ngOnInit(): void {

    /* 1) si venimos desde dialog → id en data
       2) si venimos vía /productos/:id → id en la URL                       */
    const idFromDialog = this.dialogConfig?.data?.id as number | undefined;
    const id = idFromDialog ?? Number(this.route.snapshot.paramMap.get('id'));

    if (!id) { this.errorMsg = 'Producto no encontrado'; return; }

    this.http.get<Zapatilla>(`${environment.api_url}/zapatilla/${id}`)
      .subscribe({
        next : d => { this.zapatilla = d; this.loading = false; },
        error: _ => { this.errorMsg  = 'Producto no encontrado'; this.loading = false; }
      });
  }

  /* ---------------------------- helpers ----------------------------- */
  formatPrice(n: number){ return n.toLocaleString('es-AR'); }

  seleccionarTalle(s: Stock){
    if (!s.activo || s.cantidad === 0) return;
    this.selectedStock = s;
  }

  /* cerrar si estamos en diálogo */
  cerrar(){ this.dialogRef?.close(); }

  /* ------------------ botón "Agregar al carrito" ------------------- */
  agregarAlCarrito(){
    if (!this.selectedStock || this.agregando) return;

    this.agregando = true;
    this.carrito.agregarAlCarrito({
      stockId : this.selectedStock.id,
      cantidad: 1
    }).subscribe({
      next: () => {
        this.agregando = false;
        Swal.fire({
          toast: true, position: 'top-end', icon: 'success',
          title: 'Agregado al carrito', timer: 1200, showConfirmButton: false
        });
        /* opcional: cerrar el modal una vez agregado */
        this.dialogRef?.close();
      },
      error: () => {
        this.agregando = false;
        Swal.fire({
          toast: true, position: 'top-end', icon: 'error',
          title: 'Tenés que iniciar sesión para agregar al carrito',
          timer: 2000, showConfirmButton: false
        });
      }
    });
  }
}


