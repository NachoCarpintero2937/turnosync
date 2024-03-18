import { EventEmitter, Injectable } from '@angular/core';
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
  ) { }
  public color = new EventEmitter();
  getSettings(data?: any) {
    return this.ApiService.get(
      this.EnviromentService.getEndpoints().endpoints.settings.settings,
      data
    );
  }

  mapStyleToConfiguration(data: any) {
    var cfg: any = {}
    if (data?.cfg) {
     cfg[data?.type] = sessionStorage.getItem(data?.type);
      return cfg;
    } else if (data?.length) {
      const toolbar = this.findConfiguration(data, 'toolbar');
      const cardHome = this.findConfiguration(data, 'cardHome');
      const icons = this.findConfiguration(data, 'icons');
      const btnIcons = this.findConfiguration(data, 'button-icons');
      return {
        toolbar: toolbar?.configuration_value,
        cardHome: cardHome?.configuration_value,
        icons: icons?.configuration_value,
        btnIcons: btnIcons?.configuration_value
      };
    }
    return { toolbar: null, cardHome: null, icons: null, btnIcons: null };
  }


  private findConfiguration(configurations: any[], key: string) {
    for (const config of configurations) {
      if (config?.configuration_key === key) {
        return config;
      }
    }
    return null;
  }


  setClassPropeties(data: any) {
    let toolbar = sessionStorage.getItem('toolbar');
    let cardHome = sessionStorage.getItem('cardHome');
    // Simulación de estilos CSS
    const css = `
      .mat-toolbar{
        background: ${toolbar};
      }

      .inicial_muro,
      .border-inicials{
        border-color: ${toolbar}!important;
      }
      .title-dialog{
        background:${toolbar} !important;
      }
      .confirm-dialog{
        border:1px solid ${toolbar} !important;
    }

      .card-info{
        background:${cardHome} !important;
      }
  
      mat-card-header{
        background:${toolbar} !important;
      }
      mat-card-content{
        background:white!important;
      }
      mat-icon{
        color:${toolbar} !important;
      }
      button>span.material-icons{
        color:${toolbar} !important;
      }

      a>span.material-icons{
        color:${toolbar} !important;
      }

      button[mat-button]{
        background:${toolbar}!important;
     
      }

      button[mat-fab]{
        background:${toolbar}!important;
     
      }
      
      .bagde-count{
        background:${toolbar}!important;
      }

      .iniciales{
        color:${toolbar}  !important;
      }
    `;
    return css;
  }


  getCustomConfiguration(configurations: any[], key: string){
    if(configurations.length){
      for (const config of configurations) {
        if (config?.configuration_key === key) {
          return config;
        }
      }
      return null;
    }
    }

}
