import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService
    ) { }

  getUsers(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.users.users,
      data
    );
  }
}
