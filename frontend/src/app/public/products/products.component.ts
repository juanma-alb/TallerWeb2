import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoeComponent } from '../shoe/shoe.component';
import { FiltersComponent } from '../filters/filters.component';
import { Zapatilla } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDetailComponent }        from '../product-detail/product-detail.component'; 
import { FooterComponent } from '../../shared/footer/footer.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ShoeComponent, FiltersComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [DialogService],
})
export class ProductsComponent implements OnInit {
  zapatillas: Zapatilla[] = [];
  filteredZapatillas: Zapatilla[] = []; 
  searchTerm: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
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
    private router: Router,
    private dialogService: DialogService 
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

  private ref?: DynamicDialogRef;

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

 openDetail(z: Zapatilla) {
  this.ref = this.dialogService.open(ProductDetailComponent, {
    header : z.nombre,
    data   : { id: z.id },
    width  : '70vw',
    modal  : true,

    styleClass: 'product-dialog dark-dialog',

    contentStyle: { padding: '0' },

    dismissableMask: true,

    ...(<any>{ autoFocus: false, focusTrap: false })
  });
}


  ngOnDestroy(){
    this.ref?.close();
  }


  private fetchZapatillas(): void {
    this.loading = true;

    const queryParams: any = {
      marcas: this.selectedFilters.marcas.join(','),
      talles: this.selectedFilters.talles.join(','),
      colores: this.selectedFilters.colores.join(','),
      sexos: this.selectedFilters.sexos.join(','),
    };

    if (this.searchTerm) queryParams.search = this.searchTerm;
    if (this.minPrice !== null) queryParams.minPrice = this.minPrice;
    if (this.maxPrice !== null) queryParams.maxPrice = this.maxPrice;

    this.http
      .get<Zapatilla[]>(`${environment.api_url}/zapatilla`, {
        params: queryParams,
      })
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

  onSearchTermChange(value: string) {
    this.searchTerm = value;
    this.updateQueryParams();
    this.fetchZapatillas();
  }


  onMinPriceChange(value: number | null) {
    this.minPrice = value;
    this.updateQueryParams();
    this.fetchZapatillas();
  }

  onMaxPriceChange(value: number | null) {
    this.maxPrice = value;
    this.updateQueryParams();
    this.fetchZapatillas();
  }

  toggleFilter<T>(filter: any[], value: T): void {
    const index = filter.indexOf(value as any);
    index > -1 ? filter.splice(index, 1) : filter.push(value as any);
    this.updateQueryParams();
    this.fetchZapatillas();
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

  private updateQueryParams(): void {
    const { marcas, talles, colores, sexos } = this.selectedFilters;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        marcas: marcas.length ? marcas.join(',') : null,
        talles: talles.length ? talles.join(',') : null,
        colores: colores.length ? colores.join(',') : null,
        sexos: sexos.length ? sexos.join(',') : null,
        search: this.searchTerm ? this.searchTerm : null,
        minPrice: this.minPrice !== null ? this.minPrice : null,
        maxPrice: this.maxPrice !== null ? this.maxPrice : null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
