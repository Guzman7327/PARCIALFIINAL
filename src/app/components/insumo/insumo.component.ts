import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css'],
})
export class InsumoComponent implements OnInit {
  insumos: any[] = [];
  nuevoInsumo = {
    _id: '',
    encuestaId: '',
    preguntaId: '',
    escalas: '',
    grupoPresentacion: '',
  };

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.cargarInsumos();
  }

  async cargarInsumos(): Promise<void> {
    this.insumos = await this.dbService.getAllDocuments('insumos');
  }

  async agregarInsumo(): Promise<void> {
    if (
      this.nuevoInsumo._id &&
      this.nuevoInsumo.encuestaId &&
      this.nuevoInsumo.preguntaId &&
      this.nuevoInsumo.escalas &&
      this.nuevoInsumo.grupoPresentacion
    ) {
      await this.dbService.addDocument('insumos', this.nuevoInsumo);
      this.nuevoInsumo = { _id: '', encuestaId: '', preguntaId: '', escalas: '', grupoPresentacion: '' };
      this.cargarInsumos();
    }
  }

  async eliminarInsumo(insumo: any): Promise<void> {
    await this.dbService.deleteDocument('insumos', insumo._id);
    this.cargarInsumos();
  }

  async actualizarInsumo(insumo: any): Promise<void> {
    await this.dbService.updateDocument('insumos', insumo);
    this.cargarInsumos();
  }
}
