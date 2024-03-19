import { Component,OnInit,Input,OnChanges} from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/public/login/services/login.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-view-form-service',
  templateUrl: './view-form-service.component.html',
  styleUrls: ['./view-form-service.component.scss']
})
export class ViewFormServiceComponent implements OnChanges{
  constructor(
    private ServiceService : ServicesService,
    private fb : FormBuilder,
    private Router : Router,
    private LoginService : LoginService,
    private NgxPermissionsService: NgxPermissionsService
    ){}

@Input() service: any;
form = this.fb.group({
id: [],
name : [null,Validators.required],
price : [null,Validators.required],
price_id: [null],
user_id : [this.LoginService.getDataUser().data?.id,Validators.required]
});


ngOnChanges(){
  if(this.service)
  this.InitComponent();
}

InitComponent(){
  this.setValue();
}
hasPermission(permission: string) {
  return this.NgxPermissionsService.getPermission(permission);
}

setValue(){
  this.form.get('id')?.setValue(this.service?.id);
  this.form.get('name')?.setValue(this.service?.name);
  this.form.get('price_id')?.setValue(this.service?.price_id);
  this.form.get('price')?.setValue(this.service?.price?.price);
  this.form.get('user_id')?.setValue(this.service?.user_id);
}
submit(){
  this.ServiceService.setService(this.form.getRawValue()).then((data:any)=>{
      this.Router.navigate(['in/services/']);
  })
}
}
