import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService,
    private DatePipe: DatePipe
  ) { }

  getClients(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.clients.clients,
      data
    );
  }

  setClients(data: any) {
    const client = this.mapToCreateClient(data);
    return this.ApiService.post(
      data?.id ? this.EnviromentService.getEndpoints().endpoints.clients.update :
        this.EnviromentService.getEndpoints().endpoints.clients.create,
      client
    );
  }

  deleteClient(data : any){
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.clients.delete,
      data
    );
  }

  mapToCreateClient(data: any) {
    return {
      id: data?.id,
      name: data?.name,
      email: data?.email,
      cod_area: data?.cod_area,
      phone: data?.phone,
      date_birthday: this.DatePipe.transform(data?.date_birthday, 'yyyy-MM-dd HH:mm:ss')
    }
  }
}
