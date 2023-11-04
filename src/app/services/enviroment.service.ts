import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnviromentService {
  constructor() {}

  getEndpoints() {
    return {
      endpoints: {
        home: {
          employeesData: './assets/mocks/home.json',
        },
      },
    };
  }
}
