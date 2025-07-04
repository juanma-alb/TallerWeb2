import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),            
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations()                       
  ]
}).catch(err => console.error(err));