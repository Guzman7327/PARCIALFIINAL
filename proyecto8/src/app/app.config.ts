import { ApplicationConfig, provideZoneChangeDetection, ApplicationRef } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTanStackQuery, QueryClient, withDevtools } from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideTanStackQuery(new QueryClient(), withDevtools())
    ]
};
