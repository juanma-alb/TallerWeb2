import { Component, Input } from '@angular/core';
import { Zapatilla } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shoe',
  imports: [CommonModule],
  templateUrl: './shoe.component.html',
  styleUrl: './shoe.component.css',
})
export class ShoeComponent {
  @Input() zapatilla!: Zapatilla;
}
