import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private Router: Router,
    private LoginService: LoginService
  ) {}

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    this.LoginService.login(this.form.getRawValue()).then((data: any) => {
      this.LoginService.setUserData(data);
      this.goToHome(data);
    });
  }

  goToHome(data:any){
    this.Router.navigate(['/in/home']).then(() =>{
      this.LoginService.dataUserSubject.next(data);
    });
  }
}
