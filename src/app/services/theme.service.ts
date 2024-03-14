import {Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { EnviromentService } from './enviroment.service';

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(    

    private ApiService: ApiService,
    private EnviromentService: EnviromentService
    ) {}

    getSettings(data?: any) {
      return this.ApiService.get(
        this.EnviromentService.getEndpoints().endpoints.settings.settings,
        data
      );
    }

    mapStyleToConfiguration(data: any) {
      if (!data?.length) {
        return { toolbar: null, font: null };
      }
    
      const toolbar = this.findConfiguration(data, 'toolbar');
      const font = this.findConfiguration(data, 'font');
    
      return { toolbar: toolbar?.configuration_value, font: font?.configuration_value };
    }
    
    private findConfiguration(configurations: any[], key: string) {
      for (const config of configurations) {
        if (config?.configuration_key === key) {
          return config;
        }
      }
      return null;
    }
  

  setClassPropeties(data:any){
    // Simulación de estilos CSS
    const css = `
      .mat-toolbar{
        background: ${data?.toolbar};
        color:${data?.font}  !important;
      }

      .card-info{
        background:${data?.toolbar} !important;
        color:${data?.font}  !important;
      }
  
      mat-card-header{
        background:${data?.toolbar} !important;
        color:${data?.font}  !important;
      }
      mat-card-content{
        background:white!important;
      }
      .material-icons{
        color:red!important;
      }
      
      button[mat-button]{
        background:${data?.toolbar}!important;
        color:red!important;
      }

      button[mat-fab]{
        background:${data?.toolbar}!important;
        color:red!important;
      }
    `;
return css;
  }




}
