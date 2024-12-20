import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  constructor(
    private ApiService: ApiService,
    private EnviromentService: EnviromentService
  ) { }

  getShifts(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.shifts.shifts,
      data
    );
  }

  setShift(data: any) {
    return this.ApiService.post(
      data?.id ? this.EnviromentService.getEndpoints().endpoints.shifts.update :
        this.EnviromentService.getEndpoints().endpoints.shifts.create,
      data
    );
  }

  setShiftSelected(data: any) {
    return this.ApiService.post(this.EnviromentService.getEndpoints().endpoints.shifts.createToShift, data);
  }

  mapToShift(data: any, date: any) {
    return {
      id: data?.id,
      date_shift: date,
      description: data?.description,
      status: data?.status,
      price: data?.price.toString().replace('$', '').replace('.', '').replace(',', ''),
      service_id: data?.service_id,
      client_id: data?.client_id,
      user_id: data?.user_id
    }
  }

  filterItems(items: any[], search: string): any[] {
    const filterValue = search?.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(filterValue));
  }

  getStatusSfits(shift: any): string {
    switch (shift?.status) {
      case 1:
        return "Confirmado";
        break;
      case 0:
        return "Pendiente";
        break;
      case 2:
        return "Cancelado";
        break;
      default:
        return "Sin estado";
        break;
    }
  }

  formatInput(data: any) {
    let value = data;
    // Remueve cualquier carácter que no sea un dígito o un punto decimal
    value = value.replace(/[^\d.]/g, '');
    // Divide el valor en parte entera y parte decimal
    const [integerPart, decimalPart] = value.split('.');
    // Formatea la parte entera con separadores de miles
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    // Si hay parte decimal, formatearla también
    const formattedDecimalPart = decimalPart ? `.${decimalPart.slice(0, 2)}` : '';
    // Vuelve a asignar el valor formateado al control
    return formattedIntegerPart + formattedDecimalPart;
  }


  sendWspApi(data: any) {
    const dataWsp = {
      phone: data?.data?.cod_area+data?.data?.phone,
      message : data?.message
    }
    return this.ApiService.post(this.EnviromentService.getEndpoints().endpoints.shifts.sendWsp, dataWsp);
  }

}
