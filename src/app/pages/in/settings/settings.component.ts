import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { SettingsService } from './services/settings.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(
    private ThemeService: ThemeService,
    private SettingsService: SettingsService,
    private ToastService: ToastService,
    private SettingService:SettingsService
) { }
  company: any;
  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.ThemeService.getSettings().then((settings: any) => {
      this.company = settings?.data?.companies;
    }).catch((e) => { })
  }

  setColor(cfg: Object) {
    this.ThemeService.color.emit(cfg);
  }

getNameCompany(name:string){
  this.SettingService.name.emit(name)
}

  submitSettings(data:any){
    const formData = this.SettingsService.mapData(data);
    this.SettingsService.setSettings(formData).then((data:any)=>{
      this.ToastService.showToastNew(
        '',
        data?.message,
        'success'
      );
    }).catch(() =>{})
  }
}
