import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private _http: HttpClient) {}

  public async get(url: string, model?: any) {
    const options = {
      params: this.formatParams(model),
    };
    const get = this._http.get(url, options);
    return await lastValueFrom(get);
  }
  
  private formatParams(model: any): any {
    if (!model || typeof model !== 'object') {
      return {};
    }
  
    // Crear una copia del objeto original para no modificarlo directamente
    const formattedModel = { ...model };
  
    // Recorrer todas las propiedades del objeto
    Object.keys(formattedModel).forEach((key) => {
      if (Array.isArray(formattedModel[key])) {
        formattedModel[key] = formattedModel[key].join(',');
      }
    });
  
    return formattedModel;
  }

  
  public async post( url: string,model: any,) {
    const options = model;
    const post = this._http.post(url, options);
    return await lastValueFrom(post);
  }
}

