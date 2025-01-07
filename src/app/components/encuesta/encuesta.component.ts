import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
[x: string]: any;
export class EncuestaComponent implements OnInit {
  encuestas: any[] = [];
  nuevaEncuesta = { _id: '', descripcion: '' };


  getEncuestaNombre(encuestaId: string): string {
    const encuesta = this.encuestas.find((e) => e._id === encuestaId);
    return encuesta ? encuesta.nombre : 'Desconocido';
  }
  agregarEncuesta() {
    if (this.nuevaEncuesta._id && this.nuevaEncuesta.descripcion) {
      this.encuestas.push(this.nuevaEncuesta);
      this.nuevaEncuesta = { _id: '', descripcion: '' };
    }

  }

}

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.cargarEncuestas();
  }

  async cargarEncuestas(): Promise<void> {
    this.encuestas = await this.dbService.getAllDocuments('encuestas');
  }

  async agregarEncuesta(): Promise<void> {
    if (this.nuevaEncuesta._id && this.nuevaEncuesta.descripcion) {
      await this.dbService.addDocument('encuestas', this.nuevaEncuesta);
      this.nuevaEncuesta = { _id: '', descripcion: '' };
      this.cargarEncuestas();
    }
  }

  async eliminarEncuesta(encuesta: any): Promise<void> {
    await this.dbService.deleteDocument('encuestas', encuesta._id);
    this.cargarEncuestas();
  }

  async actualizarEncuesta(encuesta: any): Promise<void> {
    await this.dbService.updateDocument('encuestas', encuesta);
    this.cargarEncuestas();
  }
}
