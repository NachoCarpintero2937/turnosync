import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { EnviromentService } from './enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    private ApiService : ApiService,
    private EnviromentService: EnviromentService
    ) { }

  getUrl(data:any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.urls.urls,
      data
    );
  }

  setUrl(data:any) {
    return this.ApiService.post(
      data?.id ?  this.EnviromentService.getEndpoints().endpoints.urls.update :
      this.EnviromentService.getEndpoints().endpoints.urls.create,
      data
    );
  }


}
