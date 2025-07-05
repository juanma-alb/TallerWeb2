import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  producto = {
    nombre: '',
    marca: '',
    color: '',
    talle: '',
    sexo: ''
  };

  guardarProducto() {
    console.log('Producto guardado:', this.producto);
  }
}
