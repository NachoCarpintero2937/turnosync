import { Component,OnInit,Input,OnChanges } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UrlService } from 'src/app/services/url.service';
import { LoginService } from 'src/app/pages/public/login/services/login.service';
@Component({
  selector: 'app-view-form-clients',
  templateUrl: './view-form-clients.component.html',
  styleUrls: ['./view-form-clients.component.scss']
})
export class ViewFormClientsComponent implements OnInit,OnChanges {
  constructor(
    private fb: FormBuilder,
    private ClientsService: ClientsService,
    private Router: Router,
    private UrlService : UrlService,
    private LoginService : LoginService
    ){}
@Input() client! :any
@Input() idUrl! : any;
submitForm = false;
  form = this.fb.group({
    id:[null],
    name : [null,Validators.required],
    email: [null,[Validators.email,Validators.required]],
    phone : [null,Validators.required],
    cod_area: ["11",[Validators.required, Validators.pattern(/^\d+$/)]],
    date_birthday:[null,Validators.required]
  });

ngOnInit(): void {

}

ngOnChanges(){
  this.initComponent()
}

initComponent(){
  if(this.client){
    this.setValue();
  }
}

setValue(){
this.form.get('id')?.setValue(this.client?.id);
this.form.get('name')?.setValue(this.client?.name);
this.form.get('email')?.setValue(this.client?.email);
this.form.get('phone')?.setValue(this.client?.phone);
this.form.get('cod_area')?.setValue(this.client?.cod_area);
this.form.get('date_birthday')?.setValue(this.client?.date_birthday);

}

submit(){
  this.submitForm = true;
  this.ClientsService.setClients(this.form.getRawValue()).then((data :any)=>{
    this.submitForm=false;
    this.Router.navigate([this.idUrl ? '/clients/thanks' : 'in/clients']);
    if(this.idUrl){
      this.goUpdateUrl();
    }else{
      
    }
  }).catch(e =>{
    this.submitForm = false;
  })
}

goUpdateUrl(){
  this.UrlService.setUrl({
    id: this.idUrl,
    user_id : this.LoginService.getDataUser().data?.id
  }).then((data:any)=>{
    console.log(data)
  }).catch(e =>{

  });
}
}
