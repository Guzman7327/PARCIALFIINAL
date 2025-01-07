import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insumo } from '../models/insumo.model';

@Injectable({
  providedIn: 'root',
})
export class InsumosService {
  private baseUrl = 'http://localhost:5984/insumos';

  constructor(private http: HttpClient) {}

  getInsumos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/_all_docs?include_docs=true`);
  }

  addInsumo(insumo: Insumo): Observable<any> {
    return this.http.post(this.baseUrl, {
      ...insumo,
      _id: insumo.id,
    });
  }

  updateInsumo(insumo: Insumo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${insumo.id}`, insumo);
  }

  deleteInsumo(id: string, rev: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}?rev=${rev}`);
  }
}
