import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/pages/public/login/services/login.service';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private LoginService: LoginService,
    private Router : Router,
    private EnviromentService: EnviromentService
    ) {

    this.LoginService.dataUserSubject.subscribe(data =>{
      console.log(data , " HEADER");
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
  
  ngOnInit(): void {
    console.log(this.userData)
    this.getUserData();
    setInterval(() => {
      this.hour = this.getHours();
    }, 1000);
    this.Router.events.subscribe((page:any) => {
      if (page instanceof NavigationEnd) {
      this.url =  this.Router.url
      this.onCheckPageUrl();
      }
    })
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
}
