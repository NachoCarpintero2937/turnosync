import { Component,OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/pages/public/services/login.service';
@Component({
  selector: 'app-view-form-service',
  templateUrl: './view-form-service.component.html',
  styleUrls: ['./view-form-service.component.scss']
})
export class ViewFormServiceComponent implements OnInit{
  constructor(
    private ServiceService : ServicesService,
    private fb : FormBuilder,
    private Router : Router,
    private LoginService : LoginService
    ){}

form = this.fb.group({
name : [null,Validators.required],
price : [null,Validators.required],
user_id : [this.LoginService.getDataUser().data?.id,Validators.required]
});

// INIT
ngOnInit(): void {
  
}

submit(){
  this.ServiceService.setService(this.form.getRawValue()).then((data:any)=>{
      this.Router.navigate(['in/services/']);
  })
}
}
