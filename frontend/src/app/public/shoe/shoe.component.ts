import { Component, Input } from '@angular/core';
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
  @Input() zapatilla!: Zapatilla;
}
