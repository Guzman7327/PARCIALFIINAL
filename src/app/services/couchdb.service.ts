import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CouchdbService {
  private dbUrl = 'http://localhost:5984/encuestas';

  constructor(private http: HttpClient) {}

  // Obtener todos los documentos
  getAllDocuments() {
    return this.http.get<any>(`${this.dbUrl}/_all_docs?include_docs=true`).toPromise().then((res) =>
      res.rows.map((row: any) => row.doc)
    );
  }

  // Crear un nuevo documento
  addDocument(document: any) {
    return this.http.post(this.dbUrl, document).toPromise();
  }

  // Actualizar un documento
  updateDocument(document: any) {
    return this.http.put(`${this.dbUrl}/${document._id}`, document).toPromise();
  }

  // Eliminar un documento
  deleteDocument(document: any) {
    return this.http.delete(`${this.dbUrl}/${document._id}?rev=${document._rev}`).toPromise();
  }
}
