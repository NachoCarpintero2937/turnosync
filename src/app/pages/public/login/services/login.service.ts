import {  Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService,
    private Router: Router
  ) {}
  public dataUserSubject: BehaviorSubject<any> = new BehaviorSubject(this.getDataUser());
  login(data: any) {
    return this.ApiService.post(
      this.EnviromentService.getEndpoints().endpoints.login.login,
      data
    );
  }

  setUserData(data: any) {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  getDataUser() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  logout(path: string = '/login'): Promise<object> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('currentUser');
      this.dataUserSubject.next(null);
      this.Router.navigate([path])
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
}
