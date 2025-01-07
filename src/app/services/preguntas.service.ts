import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../models/pregunta.model';

@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  private baseUrl = 'http://localhost:5984/preguntas';

  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/_all_docs?include_docs=true`);
  }

  addPregunta(pregunta: Pregunta): Observable<any> {
    return this.http.post(this.baseUrl, {
      ...pregunta,
      _id: pregunta.id,
    });
  }

  updatePregunta(pregunta: Pregunta): Observable<any> {
    return this.http.put(`${this.baseUrl}/${pregunta.id}`, pregunta);
  }

  deletePregunta(id: string, rev: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}?rev=${rev}`);
  }
}
