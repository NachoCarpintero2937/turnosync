import { EventEmitter, Injectable } from '@angular/core';
import { EnviromentService } from './enviroment.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
    public taskCheck = new EventEmitter();
    constructor(
        private EnviromentService : EnviromentService,
        private ApiService :ApiService
    ){}

    getTasks(data:any){
        return this.ApiService.get(
            this.EnviromentService.getEndpoints().endpoints.campaign.list,
            data
        );
    }

}