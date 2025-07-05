import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoeComponent } from '../shoe/shoe.component';
import { Zapatilla } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ShoeComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  zapatillas: Zapatilla[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getZapatillas();
  }

  getZapatillas(): void {
    this.http
      .get<Zapatilla[]>('http://localhost:3000/api/zapatilla')
      .subscribe({
        next: (data) => {
          this.zapatillas = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar las zapatillas';
          console.error(err);
          this.loading = false;
        },
      });
  }
}
