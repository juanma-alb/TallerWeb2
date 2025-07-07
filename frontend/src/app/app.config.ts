import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { authInterceptor } from '../core/interceptors/auth.interceptor'; // 👈 ruta relativa

export const appConfig: ApplicationConfig = {
  providers: [
    /* rendimiento */
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),

    /* routing */
    provideRouter(routes),

    /* PrimeNG + Dynamic Dialog */
    importProvidersFrom(DynamicDialogModule),
    providePrimeNG({ theme: { preset: Aura } }),

    /* Http con fetch -y- interceptor JWT */
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]),
    ),

    /* Animaciones (Prime + Angular) */
    provideAnimations(),
  ],
};
