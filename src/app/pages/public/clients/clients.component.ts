import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { SettingsService } from '../../in/settings/services/settings.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  constructor(
    private UrlService: UrlService,
    private ActivatedRoute: ActivatedRoute,
    private ThemeService: ThemeService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) { }
  id!: any;
  showForm = false;
  loading = false;
  companyId!:string;
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

  }

  getSettings(){
    this.ThemeService.getSettings({company_id : this.companyId}).then((settings: any)=>{
      this.settings = settings?.data?.companies;
      let style= this.ThemeService.initColorTheme(settings);
      this.initTheme(style);
  })
  }

  initTheme(css: string) {
    const blob = new Blob([css], { type: 'text/css' });
    const cssUrl = URL.createObjectURL(blob);
    const linkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(linkElement, 'rel', 'stylesheet');
    this.renderer.setAttribute(linkElement, 'type', 'text/css');
    this.renderer.setAttribute(linkElement, 'id', 'custom');
    this.renderer.setAttribute(linkElement, 'href', cssUrl);
    this.renderer.appendChild(this.elementRef.nativeElement.ownerDocument.head, linkElement);
  }

  getValidUrl() {
    this.loading = true;
    this.UrlService.getUrl({ id :this.id}).then((data: any)=>{
      this.companyId = data?.data?.user?.company_id
      this.getSettings();
      this.showForm  = true;
      this.loading = false;
    }).catch(e =>{
      this.showForm = false;
      this.loading = false;
    });
  }
} 
