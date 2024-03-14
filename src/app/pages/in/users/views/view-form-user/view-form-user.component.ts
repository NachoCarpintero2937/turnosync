import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-form-user',
  templateUrl: './view-form-user.component.html',
  styleUrls: ['./view-form-user.component.scss']
})
export class ViewFormUserComponent {
  @Input() roles : any;
  @Output() submit = new EventEmitter();
  constructor(private FormBuilder: FormBuilder){}
  
  form = this.FormBuilder.group({
    name : ['',Validators.required],
    email : ['',Validators.required],
    password : ['',Validators.required],
    role : ['',Validators.required],
  })


  submitForm(){
    this.submit.emit(this.form.getRawValue());
  }
}
