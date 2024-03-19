import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingsService } from '../../in/settings/services/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private Router: Router,
    private LoginService: LoginService,
    private ToastService : ToastService,
    private ActivateRoute : ActivatedRoute,
    private SettingsService: SettingsService
  ) { }
  viewPass: boolean = false;
  settingsCompany:any;
  submitForm = false;
  userData = this.LoginService.getDataUser();
  companyId!:string;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    if(this.userData)
    this.Router.navigate(['/in/home']);

    this.ActivateRoute.params.subscribe((params:any) => {
      this.companyId = params?.companyId;
      this.LoginService.dataUserSubject.next({companyId : this.companyId})
    });

    this.SettingsService.getInfoCompany.subscribe((settings:any) => {
      this.settingsCompany = settings;
    });
  }

  submit() {
    this.submitForm = true;
    this.LoginService.login(this.form.getRawValue()).then((data: any) => {
      this.LoginService.setUserData(data);
      if(!data?.data?.role?.permissions.length){
        this.ToastService.showToastNew('', 'Usuario sin permisos asignados', 'error');
      }else{
        this.goToHome(data);
      }
      this.submitForm = false;
    }).catch(e => {
      this.submitForm = false;
    })
  }

  goToHome(data: any) {
    this.LoginService.dataUserSubject.next(data);
    this.Router.navigate(['/in/home']);
  }
}
