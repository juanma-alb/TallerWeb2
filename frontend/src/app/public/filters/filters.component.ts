import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Input() marcas: string[] = [];
  @Input() talles: number[] = [];
  @Input() colores: string[] = [];
  @Input() sexos: string[] = [];
  @Input() searchTerm: string = '';
  @Input() minPrice: number | null = null;
  @Input() maxPrice: number | null = null;

  @Input() selectedMarcas: string[] = [];
  @Input() selectedTalles: number[] = [];
  @Input() selectedColores: string[] = [];
  @Input() selectedSexos: string[] = [];

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() minPriceChange = new EventEmitter<number | null>();
  @Output() maxPriceChange = new EventEmitter<number | null>();
  @Output() marcaToggled = new EventEmitter<string>();
  @Output() talleToggled = new EventEmitter<number>();
  @Output() colorToggled = new EventEmitter<string>();
  @Output() sexoToggled = new EventEmitter<string>();

  onSearchTermChange() {
    this.searchTermChange.emit(this.searchTerm);
  }

  onMinPriceChange() {
    this.minPriceChange.emit(this.minPrice);
  }

  onMaxPriceInput(value: string | number) {
    const val = typeof value === 'string' ? Number(value) : value;
    this.maxPriceChange.emit(isNaN(val) ? null : val);
  }

  toggleMarca(m: string) {
    this.marcaToggled.emit(m);
  }

  toggleTalle(t: number) {
    this.talleToggled.emit(t);
  }

  toggleColor(c: string) {
    this.colorToggled.emit(c);
  }

  toggleSexo(s: string) {
    this.sexoToggled.emit(s);
  }

  isChecked(list: any[], value: any): boolean {
    return list.includes(value);
  }
}
