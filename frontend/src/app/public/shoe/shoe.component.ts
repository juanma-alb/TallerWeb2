import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shoe',
  imports: [],
  templateUrl: './shoe.component.html',
  styleUrl: './shoe.component.css',
})
export class ShoeComponent {
  @Input() shoe!: any;
}
