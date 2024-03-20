import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { ThemeService } from 'src/app/services/theme.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    constructor(
        private ApiService :ApiService,
        private EnviromentService : EnviromentService,
        private ThemeService: ThemeService
        ){}

public name = new EventEmitter();
public getInfoCompany = new BehaviorSubject({});
setSettings(data:any){
        return this.ApiService.post(
          this.EnviromentService.getEndpoints().endpoints.settings.update,
          data
        );
      }

mapData(data:any){
  let formData :any={
    name : data?.name,
    address: data?.address,
  }
  formData['configurations'] = [];
  formData['configurations'].push({ toolbar : data?.toolbar});
  formData['configurations'].push({ cardHome : data?.cardHome});
  return formData;
}    


fetchSettings(data: any): Observable<any> {
  return new Observable((observer) => {
    this.ThemeService.getSettings(data)
      .then((settings: any) => {
        const originalTemplate = this.ThemeService.getCustomConfiguration(settings?.data?.companies?.configurations, 'originalTemplate');
        this.getInfoCompany.next(settings?.data?.companies);
        if (!parseInt(originalTemplate)) {
          const configurations = this.ThemeService.mapStyleToConfiguration(settings?.data?.companies?.configurations);
          sessionStorage.setItem('toolbar', configurations?.toolbar);
          sessionStorage.setItem('cardHome', configurations?.cardHome);
        }
        // Guardar settings en sessionStorage
        sessionStorage.setItem('settings', JSON.stringify(settings));
        observer.next(settings);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}

getCompanyData() {
  return sessionStorage.getItem('settings');
}
}