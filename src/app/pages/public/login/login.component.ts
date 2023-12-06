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
  viewPass: boolean = false;
submitForm = false;
  form = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required],
  });

  submit() {
    this.submitForm = true;
    this.LoginService.login(this.form.getRawValue()).then((data: any) => {
      this.LoginService.setUserData(data);
      this.submitForm =false;
      this.goToHome(data);
    }).catch(e =>{
      this.submitForm = false;
    })
  }

  goToHome(data:any){
    this.LoginService.dataUserSubject.next(data);
    this.Router.navigate(['/in/home']);
  }
}
