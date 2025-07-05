import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoeComponent } from '../shoe/shoe.component';
import { FiltersComponent } from '../filters/filters.component';
import { Zapatilla } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ShoeComponent, FiltersComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  zapatillas: Zapatilla[] = [];
  filteredZapatillas: Zapatilla[] = [];

  marcas: string[] = [];
  talles: number[] = [];
  colores: string[] = [];
  sexos: string[] = ['hombre', 'mujer', 'niño'];

  selectedFilters = {
    marcas: [] as string[],
    talles: [] as number[],
    colores: [] as string[],
    sexos: [] as string[],
  };

  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFilters();
    this.route.queryParamMap.subscribe((params) => {
      this.selectedFilters.marcas = this.parseParam(params.get('marcas'));
      this.selectedFilters.talles = this.parseParam(params.get('talles'))
        .map(Number)
        .filter((n) => !isNaN(n));
      this.selectedFilters.colores = this.parseParam(params.get('colores'));
      this.selectedFilters.sexos = this.parseParam(params.get('sexos'));
      this.fetchZapatillas();
    });
  }

  private parseParam(value: string | null): string[] {
    return value ? value.split(',').map((v) => v.trim().toLowerCase()) : [];
  }

  private fetchFilters(): void {
    this.http.get<any[]>(`${environment.api_url}/marca`).subscribe({
      next: (data) => (this.marcas = data.map((m) => m.nombre.toLowerCase())),
      error: (err) => console.error('Error al cargar marcas', err),
    });

    this.http.get<any[]>(`${environment.api_url}/talle`).subscribe({
      next: (data) => (this.talles = data.map((t) => t.numero)),
      error: (err) => console.error('Error al cargar talles', err),
    });

    this.http.get<any[]>(`${environment.api_url}/color`).subscribe({
      next: (data) => (this.colores = data.map((c) => c.nombre.toLowerCase())),
      error: (err) => console.error('Error al cargar colores', err),
    });
  }

  private fetchZapatillas(): void {
    this.loading = true;
    this.http.get<Zapatilla[]>(`${environment.api_url}/zapatilla`).subscribe({
      next: (data) => {
        this.zapatillas = data;
        this.filterZapatillas();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las zapatillas';
        console.error(err);
        this.loading = false;
      },
    });
  }

  toggleFilter<T>(filter: any[], value: T): void {
    const index = filter.indexOf(value as any);
    index > -1 ? filter.splice(index, 1) : filter.push(value as any);
    this.updateQueryParams();
    this.filterZapatillas();
  }

  toggleMarca(marca: string) {
    this.toggleFilter(this.selectedFilters.marcas, marca.toLowerCase());
  }

  toggleTalle(talle: number) {
    this.toggleFilter(this.selectedFilters.talles, talle);
  }

  toggleColor(color: string) {
    this.toggleFilter(this.selectedFilters.colores, color.toLowerCase());
  }

  toggleSexo(sexo: string) {
    this.toggleFilter(this.selectedFilters.sexos, sexo.toLowerCase());
  }

  filterZapatillas(): void {
    const { marcas, talles, colores, sexos } = this.selectedFilters;

    this.filteredZapatillas = this.zapatillas.filter((z) => {
      const marca = z.marca?.nombre?.toLowerCase() || '';
      const color = z.color?.nombre?.toLowerCase() || '';
      const sexo = z.sexo?.toLowerCase() || '';

      const matchMarca = marcas.length === 0 || marcas.includes(marca);
      const matchColor = colores.length === 0 || colores.includes(color);
      const matchSexo = sexos.length === 0 || sexos.includes(sexo);
      const matchTalle =
        talles.length === 0 ||
        z.stock?.some(
          (s) =>
            s.activo &&
            s.cantidad > 0 &&
            s.talle?.numero !== undefined &&
            talles.includes(s.talle.numero)
        );

      return matchMarca && matchColor && matchSexo && matchTalle;
    });
  }

  private updateQueryParams(): void {
    const { marcas, talles, colores, sexos } = this.selectedFilters;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        marcas: marcas.length ? marcas.join(',') : null,
        talles: talles.length ? talles.join(',') : null,
        colores: colores.length ? colores.join(',') : null,
        sexos: sexos.length ? sexos.join(',') : null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
