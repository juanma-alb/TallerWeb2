import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone : true,
  selector   : 'app-footer',
  imports    : [CommonModule, RouterLink],   
  templateUrl: './footer.component.html',
  styleUrls  : ['./footer.component.css'],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
