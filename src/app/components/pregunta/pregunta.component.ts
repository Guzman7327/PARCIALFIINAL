import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent implements OnInit {
  preguntas: any[] = [];
  nuevaPregunta = {
    _id: '',
    encuestaId: '',
    campoAmplio: '',
    tipoPregunta: '',
  };

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  async cargarPreguntas(): Promise<void> {
    this.preguntas = await this.dbService.getAllDocuments('preguntas');
  }

  async agregarPregunta(): Promise<void> {
    if (
      this.nuevaPregunta._id &&
      this.nuevaPregunta.encuestaId &&
      this.nuevaPregunta.campoAmplio &&
      this.nuevaPregunta.tipoPregunta
    ) {
      await this.dbService.addDocument('preguntas', this.nuevaPregunta);
      this.nuevaPregunta = { _id: '', encuestaId: '', campoAmplio: '', tipoPregunta: '' };
      this.cargarPreguntas();
    }
  }

  async eliminarPregunta(pregunta: any): Promise<void> {
    await this.dbService.deleteDocument('preguntas', pregunta._id);
    this.cargarPreguntas();
  }

  async actualizarPregunta(pregunta: any): Promise<void> {
    await this.dbService.updateDocument('preguntas', pregunta);
    this.cargarPreguntas();
  }
}
getEncuestaNombre(encuestaId: string): string {
  const encuesta = this.encuestas.find((e) => e._id === encuestaId);
  return encuesta ? encuesta.nombre : 'Desconocido';
}

getInsumoNombre(insumoId: string): string {
  const insumo = this.insumos.find((i) => i._id === insumoId);
  return insumo ? insumo.nombre : 'Desconocido';
}
editarPregunta(pregunta: any): void {
  this.nuevaPregunta = { ...pregunta }; // Cargar la pregunta seleccionada en el formulario
}
