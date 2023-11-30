import { Component, OnInit } from '@angular/core';
import { LoginService } from './pages/public/login/services/login.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { EnviromentService } from './services/enviroment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dybella-front';
  excludePage:boolean =false;
  url:any;
  constructor(
    private LoginService: LoginService,
    private EnviromentService : EnviromentService,
    private Router: Router){

  }
  userData : any;
  ngOnInit(){
    this.initComponent();
  }

  initComponent(){
    this.Router.url
    this.userData = this.LoginService.getDataUser()?.data;
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
}
