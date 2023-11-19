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
      params: model,
    };
    const get = this._http.get(url, options);
    return await lastValueFrom(get);
  }
  public async post( url: string,model: any,) {
    const options = model;
    const post = this._http.post(url, options);
    return await lastValueFrom(post);
  }

  public _getAction(method: string, model?: any) {
    return this.get(model, method);
  }
  public _postAction(method: string, model?: any) {
    return this.post(model, method);
  }
}
