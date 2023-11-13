import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginService } from 'src/app/pages/public/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private LoginService: LoginService) {}

  userData: any;
  hour!: string;
  ngOnInit(): void {
    this.getUserData();
    setInterval(() => {
      this.hour = this.getHours();
    }, 1000); // Actualizar cada segundo
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
}
