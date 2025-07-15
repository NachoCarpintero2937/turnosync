import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'argentinePeso'
})
export class ArgentinePesoPipe implements PipeTransform {
  transform(value: number) {
    if (isNaN(value)) return ''; // Manejar valores no numéricos

    // Formatear el valor a pesos argentinos
    const formattedValue = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
    return formattedValue;
  }
}