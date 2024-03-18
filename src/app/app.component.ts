import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from './pages/public/login/services/login.service';
import {  Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

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
    private NgxPermissionsService: NgxPermissionsService
  ) {

  }
  userData: any;
  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    this.Router.url
    this.userData = this.LoginService.getDataUser()?.data;
    this.initPermiss();
  }

initPermiss(){
  console.log(this.userData)
  const permissToStorage = this.userData?.role?.permissions;
  const permissionNames: string[] =permissToStorage.map((permission:any) => permission.name);
  this.NgxPermissionsService.loadPermissions(permissionNames);
}


}
