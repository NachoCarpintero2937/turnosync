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
  getRoles(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.users.getRoles,
      data
    );
  }
  getPermiss(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.users.getPermiss,
      data
    );
  }
  setUser(data: any) {
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.users.create,
      data
    );
  }

  setRole(data:any){
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.users.createRole,
      data
    );
  }

  setStatus(data: any) {
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.users.status,
      data
    );
  }
}
