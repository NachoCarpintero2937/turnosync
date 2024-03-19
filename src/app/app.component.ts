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
    private NgxPermissionsService: NgxPermissionsService
  ) {

  }
  userData: any;
  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    this.LoginService.dataUserSubject.subscribe(() =>{
      this.userData = this.LoginService.getDataUser()?.data;
      this.initPermiss();
    });
  }

initPermiss(){
  if(this.userData){
    const permissToStorage = this.userData?.role?.permissions;
    const permissionNames: string[] =permissToStorage.map((permission:any) => permission.name);
    console.log(permissionNames)
    this.NgxPermissionsService.loadPermissions(permissionNames);
  }
}


}
