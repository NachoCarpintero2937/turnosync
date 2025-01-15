import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnviromentService {
  constructor() { }
   secretKey = '!*TurnosSync*!';
  // API_URL = 'http://localhost/dybella-api/public/api';
  API_URL = 'https://turnosync.com.ar/api/public/api';

  getEndpoints() {
    return {
      endpoints: {
        login: {
          login: this.API_URL + '/login',
        },
        shifts: {
          getShiftToUsers: this.API_URL + '/users/getShiftToUsers',
          shifts: this.API_URL + '/shifts',
          create: this.API_URL + '/shifts/create',
          update: this.API_URL + '/shifts/update',
          updateStatus: this.API_URL + '/shifts/updateStatus',
          notifications: this.API_URL + '/shifts/notifications',
          createToShift: this.API_URL + '/shifts/createToShift',
          sendWsp : this.API_URL + '/shifts/send-wsp'
        },
        clients: {
          clients: this.API_URL + '/clients',
          create: this.API_URL + '/clients/create',
          update: this.API_URL + '/clients/update',
          delete: this.API_URL + '/clients/delete'
        },
        services: {
          services: this.API_URL + '/services',
          create: this.API_URL + '/services/create',
          update: this.API_URL + '/services/update'
        },
        users: {
          users: this.API_URL + '/users',
          getRoles : this.API_URL + '/users/getRoles',
          create:this.API_URL + '/users/create',
          update:this.API_URL + '/users/update',
          status : this.API_URL + '/users/suspend',
          getPermiss : this.API_URL + '/users/getPermiss',
          createRole : this.API_URL + '/users/createRole'
        },
        urls: {
          urls: this.API_URL + '/urls',
          create: this.API_URL + '/urls/create',
          update: this.API_URL + '/urls/update'
        },
        chart: {
          reports: this.API_URL + '/shifts/reports'
        },
        settings: {
          settings: this.API_URL + '/companies',
          update : this.API_URL + '/companies/update'
        },
        campaign: {
          send: this.API_URL + '/campaign/send',
          list: this.API_URL + '/campaign/list',
        },
      },
    };
  }

  getErrorCodeHttp() {
    const HttpErrorCodes: Record<number, string> = {
      500: 'Error en el servidor (500)',
      403: 'Sesión expirada, ingrese nuevamente'
    };
    return HttpErrorCodes;
  }

  getMonthly() {
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  }

  getExcludePagesHeader() {
    return ['/login', '/clients', '/home', '/thanks'];
  }


  
}

