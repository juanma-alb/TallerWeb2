import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoeComponent } from '../shoe/shoe.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ShoeComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  shoes = [
    { id: 1, name: 'Shoe 1', price: 100 },
    { id: 2, name: 'Shoe 2', price: 150 },
    { id: 3, name: 'Shoe 3', price: 200 },
  ];
}
