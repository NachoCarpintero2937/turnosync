import { Component, OnInit } from '@angular/core';
import { LoginService } from './pages/public/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dybella-front';
  constructor(private LoginService: LoginService){

  }
  userData : any;
  ngOnInit(){
    this.initComponent();
  }

  initComponent(){
    this.userData = this.LoginService.getDataUser()?.data;
  }
}
