import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Zapatilla } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shoe',
  imports: [CommonModule, RouterModule],
  templateUrl: './shoe.component.html',
  styleUrl: './shoe.component.css',
})
export class ShoeComponent {
  @Input()  zapatilla!: Zapatilla;

  /* --- nuevo: propagamos un evento al padre --- */
  @Output() detalle = new EventEmitter<Zapatilla>();

  /** clic en “Ver detalle” → aviso al padre */
  verDetalle(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.detalle.emit(this.zapatilla);
  }
}
