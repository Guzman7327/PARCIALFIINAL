import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Importar el módulo de rutas
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { InsumoComponent } from './components/insumo/insumo.component';

import { CouchdbService } from './services/couchdb.service'; // Servicio CouchDB

@NgModule({
  declarations: [
    AppComponent,
    EncuestaComponent,
    PreguntaComponent,
    InsumoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Para llamadas HTTP
    AppRoutingModule, // Módulo de rutas
  ],
  providers: [CouchdbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
