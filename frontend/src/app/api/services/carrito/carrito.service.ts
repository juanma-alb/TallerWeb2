import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environment/environment';
import {
  Carrito,
  CarritoResponse,
  AgregarAlCarritoDto,
  ActualizarCantidadDto
} from '../../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = `${environment.api_url}/carrito`;
  private carritoSubject = new BehaviorSubject<Carrito | null>(null);
  public carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient) {
    // No cargar carrito automáticamente - se carga solo cuando el usuario está logueado
  }

  public cargarCarrito(): void {
    this.obtenerCarrito().subscribe({
      next: (response) => {
        if (response.success) {
          this.carritoSubject.next(response.data);
        }
      },
      error: (error) => {
        console.error('Error al cargar carrito:', error);
      }
    });
  }

  obtenerCarrito(): Observable<CarritoResponse> {
    return this.http.get<CarritoResponse>(this.apiUrl);
  }

  agregarAlCarrito(data: AgregarAlCarritoDto): Observable<CarritoResponse> {
    return this.http.post<CarritoResponse>(this.apiUrl, data).pipe(
      tap(response => {
        if (response.success) {
          this.carritoSubject.next(response.data);
        }
      })
    );
  }

  actualizarCantidad(itemId: number, data: ActualizarCantidadDto): Observable<CarritoResponse> {
    return this.http.put<CarritoResponse>(`${this.apiUrl}/item/${itemId}`, data).pipe(
      tap(response => {
        if (response.success) {
          this.carritoSubject.next(response.data);
        }
      })
    );
  }

  eliminarItem(itemId: number): Observable<CarritoResponse> {
    return this.http.delete<CarritoResponse>(`${this.apiUrl}/item/${itemId}`).pipe(
      tap(response => {
        if (response.success) {
          this.carritoSubject.next(response.data);
        }
      })
    );
  }

  vaciarCarrito(): Observable<CarritoResponse> {
    return this.http.delete<CarritoResponse>(this.apiUrl).pipe(
      tap(response => {
        if (response.success) {
          this.carritoSubject.next(response.data);
        }
      })
    );
  }

  finalizarCompra(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkout`, {}).pipe(
      tap(response => {
        if (response.success) {
          // Limpiar carrito después de finalizar compra
          this.carritoSubject.next({
            id: 0,
            usuarioId: 0,
            estado: 'ACTIVO',
            items: [],
            total: 0,
            cantidadTotal: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      })
    );
  }

  // Métodos auxiliares
  obtenerCantidadTotal(): number {
    const carrito = this.carritoSubject.value;
    return carrito ? carrito.cantidadTotal : 0;
  }

  obtenerTotal(): number {
    const carrito = this.carritoSubject.value;
    return carrito ? carrito.total : 0;
  }

  estaVacio(): boolean {
    const carrito = this.carritoSubject.value;
    return !carrito || carrito.items.length === 0;
  }

  refrescarCarrito(): void {
    this.cargarCarrito();
  }
}
