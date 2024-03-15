import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimepickerService {

  constructor() { }


  getConfiguration()   {
   var toolbar = sessionStorage.getItem('toolbar');
    return {
      container: {
        bodyBackgroundColor: '#fff',
        buttonColor:toolbar !== null ? toolbar : '',
      },
      dial: {
        dialBackgroundColor:toolbar !== null ? toolbar : '',
  
      },
      clockFace: {
        clockFaceBackgroundColor:toolbar !== null ? toolbar : '',
        clockHandColor: '#a58171',
        clockFaceTimeInactiveColor: '#fff',
      }
    }
    }
}
