import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-form-user',
  templateUrl: './view-form-user.component.html',
  styleUrls: ['./view-form-user.component.scss']
})
export class ViewFormUserComponent {
  constructor(private FormBuilder: FormBuilder){}
  
  form = this.FormBuilder.group({
    name : ['',Validators.required],
    email : ['',Validators.required],
    password : ['',Validators.required],
    rol : ['',Validators.required],
  })
}
