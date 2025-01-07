import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root',
})
export class PouchdbService {
  private db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB('encuestas_db');
  }

  async addDocument(doc: any) {
    try {
      const response = await this.db.put(doc);
      return response;
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  async getDocument(id: string) {
    try {
      return await this.db.get(id);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }

  async getAllDocuments() {
    try {
      const result = await this.db.allDocs({ include_docs: true });
      return result.rows.map((row) => row.doc);
    } catch (error) {
      console.error('Error fetching all documents:', error);
    }
  }

  async updateDocument(doc: any) {
    try {
      const response = await this.db.put(doc);
      return response;
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  async deleteDocument(doc: any) {
    try {
      const response = await this.db.remove(doc);
      return response;
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
}
