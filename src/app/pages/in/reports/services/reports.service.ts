import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService,
  ) {}

  getReports(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.chart.reports,
      data,
    );
  }

  analyzeReports(totalYears: any) {
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.chart.analyze,
      { totalYears },
    );
  }
}
