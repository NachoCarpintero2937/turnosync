import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    constructor(
        private ApiService :ApiService,
        private EnviromentService : EnviromentService
        ){}

    
setSettings(data:any){
        return this.ApiService.post(
          this.EnviromentService.getEndpoints().endpoints.settings.update,
          data
        );
      }

mapData(data:any){
  let formData :any={
    name : data?.name,
    address: data?.address,
  }
  formData['configurations'] = [];
  formData['configurations'].push({ toolbar : data?.toolbar});
  formData['configurations'].push({ font : data?.toolbar});
  return formData;
}    
}