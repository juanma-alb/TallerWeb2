import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Input() marcas: string[] = [];
  @Input() talles: number[] = [];
  @Input() colores: string[] = [];
  @Input() sexos: string[] = [];

  @Input() selectedMarcas: string[] = [];
  @Input() selectedTalles: number[] = [];
  @Input() selectedColores: string[] = [];
  @Input() selectedSexos: string[] = [];

  @Output() marcaToggled = new EventEmitter<string>();
  @Output() talleToggled = new EventEmitter<number>();
  @Output() colorToggled = new EventEmitter<string>();
  @Output() sexoToggled = new EventEmitter<string>();

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
