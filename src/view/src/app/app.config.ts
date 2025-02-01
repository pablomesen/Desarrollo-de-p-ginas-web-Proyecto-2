import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importa tus rutas
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Proporciona las rutas
    provideHttpClient(), // Proporciona HttpClient
    provideAnimationsAsync(), provideAnimationsAsync(), // Proporciona animaciones
  ],
};
