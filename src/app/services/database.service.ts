import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private databases: { [key: string]: PouchDB.Database } = {};

  // Crear o acceder a una base de datos
  createDatabase(dbName: string): PouchDB.Database {
    if (!this.databases[dbName]) {
      const localDB = new PouchDB(dbName);
      const remoteDB = new PouchDB(`http://127.0.0.1:5984/_utils/#database/encuestas/_all_docs`);
      localDB.sync(remoteDB, {
        live: true,
        retry: true,
      });
      this.databases[dbName] = localDB;
    }
    return this.databases[dbName];
  }

  // Agregar documento a la base de datos
  async addDocument(dbName: string, document: any): Promise<void> {
    const db = this.createDatabase(dbName);
    try {
      await db.put(document);
      console.log(`Documento agregado a la base de datos ${dbName}`);
    } catch (err) {
      console.error('Error al agregar documento:', err);
    }
  }

  // Obtener todos los documentos
  async getAllDocuments(dbName: string): Promise<any[]> {
    const db = this.createDatabase(dbName);
    try {
      const result = await db.allDocs({ include_docs: true });
      return result.rows.map((row) => row.doc);
    } catch (err) {
      console.error('Error al obtener documentos:', err);
      return [];
    }
  }

  // Actualizar un documento
  async updateDocument(dbName: string, document: any): Promise<void> {
    const db = this.createDatabase(dbName);
    try {
      const doc = await db.get(document._id);
      await db.put({ ...doc, ...document });
      console.log(`Documento actualizado en la base de datos ${dbName}`);
    } catch (err) {
      console.error('Error al actualizar documento:', err);
    }
  }

  // Eliminar un documento
  async deleteDocument(dbName: string, id: string): Promise<void> {
    const db = this.createDatabase(dbName);
    try {
      const doc = await db.get(id);
      await db.remove(doc);
      console.log(`Documento eliminado de la base de datos ${dbName}`);
    } catch (err) {
      console.error('Error al eliminar documento:', err);
    }
  }
}
// Métodos CRUD centralizados para cualquier colección
  async getAllDocuments(collectionName: string): Promise<any[]> {
    const db = new PouchDB(collectionName);
    const result = await db.allDocs({ include_docs: true });
    return result.rows.map((row: any) => row.doc);
  }

  async getDocumentById(collectionName: string, docId: string): Promise<any> {
    const db = new PouchDB(collectionName);
    return await db.get(docId);
  }

  async addDocument(collectionName: string, doc: any): Promise<void> {
    const db = new PouchDB(collectionName);
    await db.put(doc);
  }

  async updateDocument(collectionName: string, doc: any): Promise<void> {
    const db = new PouchDB(collectionName);
    const existingDoc = await db.get(doc._id);
    await db.put({ ...existingDoc, ...doc });
  }

  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    const db = new PouchDB(collectionName);
    const doc = await db.get(docId);
    await db.remove(doc);
  }

  async testConnection(): Promise<string> {
    try {
      const info = await this.remoteDB.info();
      return `Conexión exitosa a la base de datos remota: ${info.db_name}`;
    } catch (error) {
      return `Error de conexión: ${error.message}`;
    }
  }
}
