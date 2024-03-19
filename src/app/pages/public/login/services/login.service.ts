import {  Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CryptoService } from 'src/app/common/services/crypto.service';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService,
    private Router: Router,
    private CryptoService : CryptoService
  ) {}
  public dataUserSubject: BehaviorSubject<any> = new BehaviorSubject(this.getDataUser());
  login(data: any) {
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.login.login,
      data
    );
  }

  setUserData(data: any) {
    localStorage.setItem('notifications', JSON.stringify({notifications: true}));
    localStorage.setItem('currentUser', this.CryptoService.encryptData(data));
  }

  getDataUser() {
    const local = localStorage.getItem('currentUser');
    if (local)
    return JSON.parse(this.CryptoService.decryptData(local));
  else
    return null;
  
  }

  logout(path: string = '/login', companyId :string): Promise<object> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('currentUser');
      sessionStorage.clear();
      this.dataUserSubject.next(null);
      this.Router.navigate([path+'/'+companyId])
        .then(() => {
          resolve({
            status: true,
            message: 'Sesión cerrada con éxito',
          });
        })
        .catch(() => {
          reject({
            status: false,
            message: 'No se pudo cerrar sesión.',
          });
        });
    });
  }


  getNotificactions(data?:any){
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.shifts.notifications,
    data
    );
  }
}
