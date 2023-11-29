import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService
    ) { }

  getServices(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.services.services,
      data
    );
  }

setService(data:any){
  return this.ApiService.post(
    data?.id ?  this.EnviromentService.getEndpoints().endpoints.services.update :
    this.EnviromentService.getEndpoints().endpoints.services.create,
    data
  );
}
}
