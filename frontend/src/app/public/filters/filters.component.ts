import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() marcas: string[] = [];
  @Input() talles: number[] = [];
  @Input() selectedMarcas: string[] = [];
  @Input() selectedTalles: number[] = [];

  @Output() marcaToggled = new EventEmitter<string>();
  @Output() talleToggled = new EventEmitter<number>();

  toggleMarca(marca: string) {
    this.marcaToggled.emit(marca);
  }

  toggleTalle(talle: number) {
    this.talleToggled.emit(talle);
  }

  isCheckedMarca(marca: string): boolean {
    return this.selectedMarcas.includes(marca);
  }

  isCheckedTalle(talle: number): boolean {
    return this.selectedTalles.includes(talle);
  }
}
