import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './public/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
