import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { SettingsService } from '../../in/settings/services/settings.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  constructor(
    private UrlService: UrlService,
    private ActivatedRoute: ActivatedRoute,
    private SettingsService : SettingsService
  ) { }
  id!: any;
  showForm = false;
  loading = false;
  settings:any;
  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.ActivatedRoute.paramMap.subscribe((r: any) => {
      this.id = r?.params?.id
      if (this.id)
        this.getValidUrl();
    });

    this.SettingsService.getInfoCompany.subscribe((settings: any)=>{
        this.settings = settings;
    })
  }

  getValidUrl() {
    this.loading = true;
    this.UrlService.getUrl({ id :this.id}).then((data: any)=>{
      this.showForm  = true;
      this.loading = false;
    }).catch(e =>{
      this.showForm = false;
      this.loading = false;
    });
  }
} 
