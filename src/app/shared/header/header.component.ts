import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/pages/public/login/services/login.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { ViewNotificationsComponent } from './views/view-notifications/view-notifications.component';
import { ToastService } from 'src/app/services/toast.service';

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
    private ToastService: ToastService
    ) {
    const notif  = JSON.parse(localStorage.getItem('notifications')!);
    this.LoginService.dataUserSubject.subscribe(data =>{
      this.userData = data;

    })
    this.Router.events.subscribe(() =>{
      this.isMobileMenuOpen = false;
    })
  }
  isMobileMenuOpen = false;
  userData: any;
  hour!: string;
  url:any;
  excludePage:boolean =false;
  notifications :any[] = [];
  flagnotifications = JSON.parse(localStorage.getItem('notifications')!);
  
  ngOnInit(): void {
    this.initHeader()
  }
  initHeader(){
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

  }
  onCheckPageUrl() {
    const page = this.EnviromentService.getExcludePagesHeader().some(excludedPage => this.url.startsWith(excludedPage));
    this.excludePage = page;
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

  logout(){
    this.LoginService.logout().then(data =>{

    }).catch(e =>{
      
    })
  }
  getNotifications(){
    if(this.userData){
      this.LoginService.getNotificactions().then((notifications :any)=>{
      this.notifications = notifications?.data;
      }).catch((e)=>{
  
      })
    }
  }

  openBottomSheet(): void {
    this.MatBottomSheet.open(ViewNotificationsComponent, {
      data : this.notifications
    });
  }
}
