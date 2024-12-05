import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'images', loadComponent: () => import('./pages/images/images.component.ts').then(m => m.ImagesComponent)
  },
  {
    path: 'image/:id', loadComponent: () => import('./pages/image/image.component.ts').then(m => m.ImageComponent)
  },
  {
    path: '**', redirectTo: 'images'
  }
];


