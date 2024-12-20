import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';


@Injectable({
  providedIn: 'root'
})
export class CapmaignsService {
  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService,

  ) { }


  sendCampaings(data: any) {
    return this.ApiService.post(
     this.EnviromentService.getEndpoints().endpoints.campaign.send,data);
  }

}
