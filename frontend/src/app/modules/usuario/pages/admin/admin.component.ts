import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { environment } from '../../../../../environment/environment.development';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgForOf,ToastModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MessageService],

})
export class AdminComponent implements OnInit {
  marcas: { id: number, nombre: string }[] = [];
  talles: { id: number, numero: number }[] = [];
  colores: { id: number, nombre: string }[] = [];
  selectedFile: File | null = null;

  selectedStocks: {
    [talleId: number]: { activo: boolean, cantidad: number }
  } = {};

  producto = {
    nombre: '',
    marcaId: 0,
    colorId: 0,
    sexo: '',
    precio: 0,
    descripcion: '',
  };

constructor(private http: HttpClient, private router: Router,   
            private messageService: MessageService ) {}

  ngOnInit(): void {
    this.getMarcas();
    this.getTalles();
    this.getColores();
  }

  getMarcas(): void {
    this.http.get<{ id: number, nombre: string }[]>(`${environment.api_url}/marca`).subscribe({
      next: (data) => {
        this.marcas = data;
        console.log('Marcas cargadas:', this.marcas);
      },
      error: (err) => console.error('Error al cargar marcas', err),
    });
  }

  getTalles(): void {
    this.http.get<{ id: number, numero: number }[]>(`${environment.api_url}/talle`).subscribe({
      next: (data) => {
        this.talles = data;
        // Inicializar estructura para stock por talle
        this.talles.forEach(t => {
          this.selectedStocks[t.id] = { activo: false, cantidad: 0 };
        });
        console.log('Talles cargados:', this.talles);
      },
      error: (err) => console.error('Error al cargar talles', err),
    });
  }

  getColores(): void {
    this.http.get<{ id: number, nombre: string }[]>(`${environment.api_url}/color`).subscribe({
      next: (data) => {
        this.colores = data;
        console.log('Colores cargados:', this.colores);
      },
      error: (err) => console.error('Error al cargar colores', err),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
      this.messageService.add({
            severity: 'success',
            summary: 'Se permiten extenciones .jpeg .png .webp',
            detail: 'Se guardó el producto sin stock.',
          });
        return;
      }
      this.selectedFile = file;
    }
  }

  getCheckboxValue(event: Event): boolean {
    const input = event.target as HTMLInputElement;
    return input?.checked ?? false;
  }


  toggleTalle(talleId: number, isChecked: boolean): void {
    if (!this.selectedStocks[talleId]) {
      this.selectedStocks[talleId] = { activo: false, cantidad: 0 };
    }
    this.selectedStocks[talleId].activo = isChecked;
    if (!isChecked) {
      this.selectedStocks[talleId].cantidad = 0;
    }
  }

  guardarProducto(): void {
    if (!this.selectedFile) {
    this.messageService.add({
            severity: 'error',
            summary: 'Debes seleccionar una imagen',
            detail: 'Debes seleccionar una imagen.',
          });
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('marcaId', this.producto.marcaId.toString());
    formData.append('colorId', this.producto.colorId.toString());
    formData.append('sexo', this.producto.sexo);
    formData.append('precio', this.producto.precio.toString());
    formData.append('descripcion', this.producto.descripcion || '');
    formData.append('imagen', this.selectedFile);

    this.http.post<{ id: number }>(`${environment.api_url}/zapatilla`, formData).subscribe({
      next: (res) => {
        console.log('Zapatilla creada:', res);

        // talles activos y cantidad > 0
        const stocksToCreate = Object.entries(this.selectedStocks)
          .filter(([_, val]) => val.activo && val.cantidad > 0)
          .map(([talleId, val]) => ({
            talleId: Number(talleId),
            cantidad: val.cantidad
          }));

        if (stocksToCreate.length === 0) {
         this.messageService.add({
            severity: 'success',
            summary: 'Producto guardado',
            detail: 'Se guardó el producto sin stock.',
          });

          this.resetForm();
          this.router.navigate(['/productos']); 
          return;
        }

        const stockForm = new FormData();
        stockForm.append('zapatillaId', res.id.toString());
        stocksToCreate.forEach(item => {
          stockForm.append('talleId', item.talleId.toString());
          stockForm.append(`cantidad_${item.talleId}`, item.cantidad.toString());
        });

        this.http.post(`${environment.api_url}/stock`, stockForm).subscribe({
          next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto guardado',
            detail: 'Se guardó el producto sin stock.',
          });
            this.resetForm();
          },
          error: (err) => {
            console.error('Error al crear stock:', err);
            this.messageService.add({
            severity: 'error',
            summary: 'Producto guardado sin stock',
            detail: 'Se guardó el producto sin stock.',
          });
          }
        });
      },

      error: (err) => {
        console.error('Error al crear zapatilla:', err);
      }
    });
  }

  resetForm(): void {
    this.producto = {
      nombre: '',
      marcaId: 0,
      colorId: 0,
      sexo: '',
      precio: 0,
      descripcion: ''
    };
    this.selectedFile = null;
    this.talles.forEach(t => {
      this.selectedStocks[t.id] = { activo: false, cantidad: 0 };
    });
  }
}
