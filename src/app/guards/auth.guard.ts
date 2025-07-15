import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../pages/public/login/services/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private LoginService: LoginService) { }

  canActivate(): boolean {
    const token = this.LoginService.getDataUser()?.access_token
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
