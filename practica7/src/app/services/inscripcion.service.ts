import PouchDB from 'pouchdb-browser';
import { Injectable } from '@angular/core';
import { Curso } from '../interfaces/curso';
import { Aspirante } from '../interfaces/aspirante';
import { Inscripcion } from '../interfaces/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private dbInscripciones = new PouchDB<Inscripcion>('inscripciones');
  private dbCursos = new PouchDB<Curso>('cursos');
  private dbAspirantes = new PouchDB<Aspirante>('aspirantes');

  // CRUD para Inscripción
  async addInscripcion(inscripcion: Inscripcion) {
    await this.dbInscripciones.post(inscripcion);
  }

  async getInscripciones(): Promise<Inscripcion[]> {
    const result = await this.dbInscripciones.allDocs({ include_docs: true });
    return result.rows.map(row => row.doc!);
  }

  async updateInscripcion(inscripcion: Inscripcion) {
    const doc = await this.dbInscripciones.get(inscripcion.id);
    await this.dbInscripciones.put({ ...doc, ...inscripcion });
  }

  async deleteInscripcion(id: string) {
    const doc = await this.dbInscripciones.get(id);
    await this.dbInscripciones.remove(doc);
  }

  // CRUD para Cursos y Aspirantes (similar al de Inscripción)
  async getCursos(): Promise<Curso[]> {
    const result = await this.dbCursos.allDocs({ include_docs: true });
    return result.rows.map(row => row.doc!);
  }

  async getAspirantes(): Promise<Aspirante[]> {
    const result = await this.dbAspirantes.allDocs({ include_docs: true });
    return result.rows.map(row => row.doc!);
  }

  // Sincronización con CouchDB
  async syncWithCouchDB() {
    const remoteDB = new PouchDB('http://localhost:5984');
    await this.db
