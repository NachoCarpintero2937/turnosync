import { Component,OnInit,Input,OnChanges } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
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
    private DatePipe: DatePipe
    ){}
@Input() client! :any
  form = this.fb.group({
    id:[null],
    name : [null,Validators.required],
    email: [null,Validators.email],
    phone : [null,Validators.required],
    cod_area: [null,Validators.required],
    date_birthday:[null,Validators.required]
  });

ngOnInit(): void {
  // this.initComponent();
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
  console.log(this.form.getRawValue())
  this.ClientsService.setClients(this.form.getRawValue()).then((data :any)=>{
    this.Router.navigate(['in/clients']);
  })
}
}
