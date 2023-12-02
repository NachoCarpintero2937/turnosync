import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimepickerService {

  constructor() { }


  getConfiguration()   {
    return {
      container: {
        bodyBackgroundColor: '#fff',
        buttonColor: '#e1b6b6',
      },
      dial: {
        dialBackgroundColor: '#e1b6b6',
  
      },
      clockFace: {
        clockFaceBackgroundColor: '#e1b6b6',
        clockHandColor: '#a58171',
        clockFaceTimeInactiveColor: '#fff',
      }
    }
    }
}
