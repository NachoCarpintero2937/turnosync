import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iniciales'
})
export class InicialesPipe implements PipeTransform {

  constructor() { }

  transform(value: string, args?: any): string {
    let iniciales = '?';
    if (value) {
      const split_value = ("" + value).trim().split(' ').filter(x => x);
      switch (split_value.length) {
        case 0:
          break;
        case 1:
          iniciales = this._getWordMayus(split_value[0], 2);
          break
        default:
          iniciales = this._getWordMayus(split_value[0], 1);
          iniciales += this._getWordMayus(split_value[1], 1);
          break;
      }
    }

    return iniciales.toUpperCase();
  }

  private _getWordMayus(word: string, cantidad_mayusculas: number): string {
    if (word.length < cantidad_mayusculas) {
      return word.toUpperCase();
    } else {
      return word.substring(0, cantidad_mayusculas).toUpperCase();
    }
  }
}
