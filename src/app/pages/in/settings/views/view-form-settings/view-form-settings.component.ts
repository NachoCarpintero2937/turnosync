import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-form-settings',
  templateUrl: './view-form-settings.component.html',
  styleUrls: ['./view-form-settings.component.scss']
})
export class ViewFormSettingsComponent implements OnChanges{
  toolbar: string = '';
  font: string = '';
  @Input() data : any;
  @Output() color = new EventEmitter();
  constructor(private FormBuilder: FormBuilder){}

  form = this.FormBuilder.group({
    color_primary: ['', Validators.required],
    color_secondary: ['', Validators.required],
    name : ['', Validators.required],
    address: ['']
  })

ngOnChanges(): void {
  this.setValues();
}

setValues(){
    this.form.get('name')?.setValue(this.data?.name);
    this.form.get('address')?.setValue(this.data?.address);
    // this.form.get('')?.setValue();
}

changeColor(data:any){
  this.color.emit(data);
}
}
