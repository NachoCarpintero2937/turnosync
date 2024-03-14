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
export class AppComponent implements OnInit {
  title = 'dybella-front';


  constructor(
    private LoginService: LoginService,
    private Router: Router,

  ) {

  }
  userData: any;
  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    this.Router.url
    this.userData = this.LoginService.getDataUser()?.data;
  }




}
