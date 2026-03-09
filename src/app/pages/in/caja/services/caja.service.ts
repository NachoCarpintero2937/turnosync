import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({ providedIn: 'root' })
export class CajaService {
  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService,
  ) {}

  private get ep() {
    return this.EnviromentService.getEndpoints().endpoints.caja;
  }

  getReport(mes?: number, anio?: number) {
    return this.ApiService.get(this.ep.report, { mes, anio });
  }

  getEntries(userId: number, mes: number, anio: number) {
    return this.ApiService.get(this.ep.entries, { user_id: userId, mes, anio });
  }

  createEntry(data: any) {
    return this.ApiService.post(this.ep.createEntry, data);
  }

  deleteEntry(id: number) {
    return this.ApiService.post(this.ep.deleteEntry, { id });
  }

  analyze(data: any) {
    return this.ApiService.post(this.ep.analyze, data);
  }

  /** Formatea un número como ARS: 1500 → "1.500" */
  formatARS(value: number): string {
    return value.toLocaleString('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  /** Parsea string ARS "1.500" → 1500 */
  parseARS(value: string): number {
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
  }

  /** Formatea input ARS mientras el usuario escribe */
  formatInput(value: string): string {
    const clean = value.replace(/[^\d]/g, '');
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  getMeses(): string[] {
    return [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
  }
}
