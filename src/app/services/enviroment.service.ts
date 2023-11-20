import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnviromentService {
  constructor() {}
  API_URL = 'http://localhost:8000/api';

  getEndpoints() {
    return {
      endpoints: {
        login: {
          login: this.API_URL + '/login',
        },
        shifts: {
          getShiftToUsers: this.API_URL + '/users/getShiftToUsers',
          shifts: this.API_URL + '/shifts',
          create: this.API_URL + '/shifts/create'
        },
        clients : {
          clients : this.API_URL + '/clients',
          create :this.API_URL + '/clients/create'
        },
        services : {
          services : this.API_URL + '/services',
          create : this.API_URL + '/services/create'
        },
        users: {
          users: this.API_URL + '/users'
        }
      },
    };
  }

  getErrorCodeHttp() {
    const HttpErrorCodes: Record<number, string> = {
      500: 'Error en el servidor (500)',
      401: 'Sesión expirada, ingrese nuevamente',
      403: 'Sesión expirada, ingrese nuevamente',
      404: 'Error en el servidor (404)',
    };
    return HttpErrorCodes;
  }

  getExcludePagesHeader(){
    return ['/','/login']
  }
}
