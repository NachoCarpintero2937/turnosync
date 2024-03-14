import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(
    private ThemeService: ThemeService,
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

  setColor(color: string) {

  }


}
