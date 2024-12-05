import { Component, OnInit } from '@angular/core';
import { InscripcionService } from '../services/inscripcion.service';
import { Inscripcion } from '../interfaces/inscripcion';
import { Curso } from '../interfaces/curso';
import { Aspirante } from '../interfaces/aspirante';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  cursos: Curso[] = [];
  aspirantes: Aspirante[] = [];
  inscripciones: Inscripcion[] = [];
  inscripcion: Inscripcion = { id: '', idCurso: '', idAspirante: '', fecha: '', hora: '', valorCancelado: 0 };

  constructor(private inscripcionService: InscripcionService) {}

  ngOnInit(): void {
    this.obtenerCursos();
    this.obtenerAspirantes();
    this.obtenerInscripciones();
  }

  obtenerCursos() {
    this.inscripcionService.getCursos().then(data => {
      this.cursos = data;
    });
  }

  obtenerAspirantes() {
    this.inscripcionService.getAspirantes().then(data => {
      this.aspirantes = data;
    });
  }

  obtenerInscripciones() {
    this.inscripcionService.getInscripciones().then(data => {
      this.inscripciones = data;
    });
  }

  agregarInscripcion() {
    this.inscripcionService.addInscripcion(this.inscripcion).then(() => {
      this.obtenerInscripciones();
      this.inscripcion = { id: '', idCurso: '', idAspirante: '', fecha: '', hora: '', valorCancelado: 0 };
    });
  }

  actualizarInscripcion(inscripcion: Inscripcion) {
    this.inscripcionService.updateInscripcion(inscripcion).then(() => {
      this.obtenerInscripciones();
    });
  }

  eliminarInscripcion(id: string) {
    this.inscripcionService.deleteInscripcion(id).then(() => {
      this.obtenerInscripciones();
    });
  }

  sincronizarConCouchDB() {
    this.inscripcionService.syncWithCouchDB().then(() => {
      alert('Sincronización completada');
    });
  }
}
