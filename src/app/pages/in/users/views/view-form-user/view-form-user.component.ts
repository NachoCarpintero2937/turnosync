import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-form-user',
  templateUrl: './view-form-user.component.html',
  styleUrls: ['./view-form-user.component.scss']
})
export class ViewFormUserComponent implements OnChanges {
  @Input() roles: any;
  @Output() submit = new EventEmitter();
  @Input() data : any;
  constructor(private FormBuilder: FormBuilder) { }

  form = this.FormBuilder.group({
    id: [''],
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
  })

  ngOnChanges(): void {
    if(this.data)
    this.setValues()
  }

  setValues() {
    this.form.get('id')?.setValue(this.data?.id);
    this.form.get('name')?.setValue(this.data?.name);
    this.form.get('email')?.setValue(this.data?.email);
    this.form.get('role')?.setValue(this.data?.roles[0].name);
    this.form.get('password')?.clearValidators();
   }

  submitForm() {
    this.submit.emit(this.form.getRawValue());
  }
}
