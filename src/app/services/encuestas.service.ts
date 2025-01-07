import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/encuesta.model';

@Injectable({
  providedIn: 'root',
})
export class EncuestasService {
  private baseUrl = 'http://localhost:5984/encuestas'; // Cambia la URL si CouchDB está en otro servidor

  constructor(private http: HttpClient) {}

  getEncuestas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/_all_docs?include_docs=true`);
  }

  addEncuesta(encuesta: Encuesta): Observable<any> {
    return this.http.post(this.baseUrl, {
      ...encuesta,
      _id: encuesta.id, // CouchDB usa `_id` como identificador
    });
  }

  updateEncuesta(encuesta: Encuesta): Observable<any> {
    return this.http.put(`${this.baseUrl}/${encuesta.id}`, encuesta);
  }

  deleteEncuesta(id: string, rev: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}?rev=${rev}`);
  }
}
