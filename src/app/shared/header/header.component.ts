import { Component, ElementRef, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/pages/public/login/services/login.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { ViewNotificationsComponent } from './views/view-notifications/view-notifications.component';
import { ThemeService } from 'src/app/services/theme.service';
import { SettingsService } from 'src/app/pages/in/settings/services/settings.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { TaskService } from 'src/app/services/task.service';
import { IntTasks } from 'src/app/interfaces/IntTasks.interface';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private LoginService: LoginService,
    private Router : Router,
    private EnviromentService: EnviromentService,
    private MatBottomSheet: MatBottomSheet,
    private ThemeService: ThemeService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private SettingsService: SettingsService,
    public NgxPermissionsService: NgxPermissionsService,
    private TaksService: TaskService,
    private HeaderService: HeaderService
    ) {
    this.LoginService.dataUserSubject.subscribe(data =>{
      this.userData = data;
      if(this.userData?.status){
        this.getNotifications();
        this.getSettings();
      }else if(this.userData?.companyId){
        this.getSettings();
      }
    })
    this.Router.events.subscribe(() =>{
      this.isMobileMenuOpen = false;
    });

    this.ThemeService.color.subscribe((data:any)=>{
      if(data?.type && data?.cfg){
        this.removeStyle();
        let cfg = this.ThemeService.mapStyleToConfiguration(data);
        let style = this.ThemeService.setClassPropeties(cfg);
       this.initTheme(style);
      }
    });

    this.HeaderService.status.subscribe(() => {
      this.getNotifications(true); 
    });
  }
  isMobileMenuOpen = false;
  tasksData!: IntTasks[];
  imgLogo : any;
  companyData:any;
  userData:any;
  hour!: string;
  url:any;
  excludePage:boolean =false;
  notifications :any[] = [];
  flagnotifications = JSON.parse(localStorage.getItem('notifications')!);
  
  ngOnInit(): void {
    this.userData = this.LoginService.getDataUser();
    this.initTasks();

    this.initHeader();
    
  }

  initHeader(){
    this.userData = this.LoginService.getDataUser();
    this.getUserData();
    this.getNotifications();
    setInterval(() => {
      this.hour = this.getHours();
    }, 1000);
    this.Router.events.subscribe((page:any) => {
      if (page instanceof NavigationEnd) {
      this.url =  this.Router.url
      this.onCheckPageUrl();
      }
    });
    this.SettingsService.name.subscribe((name:string)=>{
      this.companyData.name = name;
    })


  }
  onCheckPageUrl() {
    const page = this.EnviromentService.getExcludePagesHeader().some(excludedPage => this.url.startsWith(excludedPage));
    this.excludePage = page;
  }

  initTasks(): void {
    setInterval(() => {
      this.getTaks();
    }, 5000);

    this.TaksService.taskCheck.subscribe((data) => {
      this.tasksData.push(data);
    });
  }

  
  getTaks(): void {
    this.TaksService.getTasks({ status: ['processing', 'pending'] }).then((data: any) => {
      this.tasksData = data?.data;
    });
  }


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  getUserData() {
    this.userData = this.LoginService.getDataUser();
  }

  getHours() {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    return `${hour}:${minute}`;
  }

  logout(companyId: string){
    this.LoginService.logout('/login',companyId).then(data =>{
      this.removeStyle();
    }).catch(e =>{
      
    })
  }
  getNotifications(openNotif?:boolean){
    if(this.userData){
      this.LoginService.getNotificactions().then((notifications :any)=>{
      this.notifications = notifications?.data;
      if(openNotif){
        this.openBottomSheet();
      }
      }).catch((e)=>{
  
      })
    }
  }

  openBottomSheet(): void {
    this.MatBottomSheet.open(ViewNotificationsComponent, {
      data : this.notifications
    });
  }

  getSettings() {
    let data;
    if(this.userData?.companyId)
    data = { company_id : this.userData?.companyId };

    this.ThemeService.getSettings(data).then((settings: any) => {
      const originalTemplate =  this.ThemeService.getCustomConfiguration(settings?.data?.companies?.configurations, 'originalTemplate');
      this.companyData = settings?.data?.companies;
      this.imgLogo = this.ThemeService.getCustomConfiguration(settings?.data?.companies?.configurations, 'imgLogo');
      if(!parseInt(originalTemplate)){
        let style = this.ThemeService.initColorTheme(settings)
       this.initTheme(style);
       if(this.userData.companyId){
        this.SettingsService.getInfoCompany.next({settings: settings,imgLogo :this.imgLogo});
       }
     }else{
      this.removeStyle();
     }
    }).catch((e) => { })
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

  removeStyle() {
    const linkElement = this.elementRef.nativeElement.ownerDocument.getElementById('custom');
    if (linkElement) {
      linkElement.parentNode.removeChild(linkElement);
    }
  }
}
