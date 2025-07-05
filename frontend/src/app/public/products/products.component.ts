import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoeComponent } from '../shoe/shoe.component';
import { Zapatilla } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ShoeComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  marcas: string[] = [];
  talles: number[] = [];
  zapatillas: Zapatilla[] = [];
  filteredZapatillas: Zapatilla[] = [];

  selectedMarcas: string[] = [];
  selectedTalles: number[] = [];

  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getZapatillas();
    this.getMarcas();
    this.getTalles();
  }

  getZapatillas(): void {
    this.http
      .get<Zapatilla[]>(`${environment.api_url}/zapatilla`)
      .subscribe({
        next: (data) => {
          this.zapatillas = data;
          this.filteredZapatillas = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar las zapatillas';
          console.error(err);
          this.loading = false;
        },
      });
  }

  getMarcas(): void {
    this.http.get<any[]>(`${environment.api_url}/marca`).subscribe({
      next: (data) => {
        this.marcas = data.map((m) => m.nombre.toLowerCase());
      },
      error: (err) => console.error('Error al cargar marcas', err),
    });
  }

  getTalles(): void {
    this.http.get<any[]>(`${environment.api_url}/talle`).subscribe({
      next: (data) => {
        this.talles = data.map((t) => t.numero);
      },
      error: (err) => console.error('Error al cargar talles', err),
    });
  }

  toggleMarca(marca: string): void {
    if (!marca) return;
    marca = marca.toLowerCase();
    const i = this.selectedMarcas.indexOf(marca);
    i > -1 ? this.selectedMarcas.splice(i, 1) : this.selectedMarcas.push(marca);
    this.filterZapatillas();
  }

  toggleTalle(talle: number): void {
    const i = this.selectedTalles.indexOf(talle);
    i > -1 ? this.selectedTalles.splice(i, 1) : this.selectedTalles.push(talle);
    this.filterZapatillas();
  }

  filterZapatillas(): void {
    this.filteredZapatillas = this.zapatillas.filter((z) => {
      const marcaNombre = z.marca?.nombre?.toLowerCase() || '';

      const matchMarca =
        this.selectedMarcas.length === 0 ||
        this.selectedMarcas.includes(marcaNombre);

      const matchTalle =
        this.selectedTalles.length === 0 ||
        z.stock?.some(
          (s) =>
            s.activo &&
            s.cantidad > 0 &&
            s.talle?.numero !== undefined &&
            this.selectedTalles.includes(s.talle.numero)
        );

      return matchMarca && matchTalle;
    });
  }
}
