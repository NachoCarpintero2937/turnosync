import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/public/login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private LoginService: LoginService,
    private Router : Router
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

  ngOnInit(): void {
    console.log("estoy vivo");
    this.getUserData();
    setInterval(() => {
      this.hour = this.getHours();
    }, 1000); // Actualizar cada segundo
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
