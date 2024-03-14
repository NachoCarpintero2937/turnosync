import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from './pages/public/login/services/login.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { EnviromentService } from './services/enviroment.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dybella-front';


  constructor(
    private LoginService: LoginService,
    private Router: Router,
    private ThemeService: ThemeService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    ){

  }
  userData : any;
  ngOnInit(){
    this.initComponent();
  }

  initComponent(){
    this.Router.url
    this.userData = this.LoginService.getDataUser()?.data;
    this.getSettings();
  }


  getSettings() {
    this.ThemeService.getSettings().then((settings: any) => {
      let configurations =  this.ThemeService.mapStyleToConfiguration(settings?.data?.companies?.configurations);
      let style = this.ThemeService.setClassPropeties(configurations);
      this.initTheme(style);
    }).catch((e) => { })
  }

  initTheme(css: string) {
    const blob = new Blob([css], { type: 'text/css' });
    const cssUrl = URL.createObjectURL(blob);
    const linkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(linkElement, 'rel', 'stylesheet');
    this.renderer.setAttribute(linkElement, 'type', 'text/css');
    this.renderer.setAttribute(linkElement, 'href', cssUrl);
    this.renderer.appendChild(this.elementRef.nativeElement.ownerDocument.head, linkElement);
  }

}
