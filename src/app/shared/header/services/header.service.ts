import { EventEmitter, Injectable } from '@angular/core';
export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
  ) { }
  public status = new EventEmitter();

  }