import { Injectable } from '@angular/core';
import { IntShift } from 'src/app/interfaces/shift/int-shift';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService
  ) {}

  getShifts(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.shifts.shifts,
      data
    );
  }

  setStatus(data?: any) {
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.shifts.updateStatus,
      data
    );
  }

groupShiftsByDate(shifts: IntShift[]): { date: string, shifts: IntShift[] }[] {
  const groupedShifts: { [date: string]: IntShift[] } = {};

  shifts.forEach(shift => {
    const date = shift.date_shift.split(' ')[0]; // Obtener solo la parte de la fecha
    if (!groupedShifts[date]) {
      groupedShifts[date] = [];
    }
    groupedShifts[date].push(shift);
  });

  // Convertir el objeto a un array de objetos
  const result: { date: string, shifts: IntShift[] }[] = Object.keys(groupedShifts).map(date => ({
    date: date,
    shifts: groupedShifts[date]
  }));

  // Ordenar el array por fecha de forma ascendente
  result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return result;
}
}
