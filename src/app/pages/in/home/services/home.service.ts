import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private EnviromentService: EnviromentService,
    private ApiService: ApiService
  ) {}

  getShifts(data: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.shifts.getShiftToUsers,
      data
    );
  }
}
