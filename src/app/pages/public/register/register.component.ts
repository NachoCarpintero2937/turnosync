import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from '../../in/users/services/users.service';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private UsersService: UsersService,
    private ToastService : ToastService,
    private Router : Router,
    private LoginService: LoginService
  ) { }
  userData = this.LoginService.getDataUser();
loading = false;
  form = this.fb.group({
    name :['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword:[''],
    latitud: [''],
    longitud: [''],
    company_name: [''],
    address : [''],
  });

  ngOnInit(): void {
    if(this.userData){
      this.Router.navigate(['/in/home']).then(() =>{
        this.LoginService.dataUserSubject.next(this.userData);
      })
    }
  }
  submit(){
    this.loading = true;
    this.UsersService.setUser(this.form.getRawValue()).then((data)=>{
    this.ToastService.showToastNew('','Registrado correctamente','success');
    this.Router.navigate(['login']);
    this.loading =false;
    }).catch(()=>{
      this.loading =false;
    })
  }
}
