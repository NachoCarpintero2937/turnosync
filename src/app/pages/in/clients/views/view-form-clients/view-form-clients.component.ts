import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-form-clients',
  templateUrl: './view-form-clients.component.html',
  styleUrls: ['./view-form-clients.component.scss']
})
export class ViewFormClientsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private ClientsService: ClientsService,
    private Router: Router
    ){}

  form = this.fb.group({
    name : [null,Validators.required],
    email: [null,Validators.email],
    phone : [null,Validators.required],
    cod_area: [null,Validators.required],
    date_birthday:[null,Validators.required]
  });

ngOnInit(): void {
  
}

submit(){
  this.ClientsService.setClients(this.form.getRawValue()).then((data :any)=>{
    this.Router.navigate(['in/clients']);
  })
}
}
