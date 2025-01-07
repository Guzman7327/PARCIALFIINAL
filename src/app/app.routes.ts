import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { InsumoComponent } from './components/insumo/insumo.component';

const routes: Routes = [
  { path: 'encuesta', component: EncuestaComponent },
  { path: 'pregunta', component: PreguntaComponent },
  { path: 'insumo', component: InsumoComponent },
  { path: '', redirectTo: '/encuesta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
