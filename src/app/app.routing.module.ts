import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { InsumoComponent } from './components/insumo/insumo.component';

const routes: Routes = [
  { path: '', redirectTo: '/encuestas', pathMatch: 'full' }, // Redirección por defecto
  { path: 'encuestas', component: EncuestaComponent },        // Ruta para encuestas
  { path: 'preguntas', component: PreguntaComponent },        // Ruta para preguntas
  { path: 'insumos', component: InsumoComponent },            // Ruta para insumos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
