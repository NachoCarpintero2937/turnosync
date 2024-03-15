import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-view-form-settings',
  templateUrl: './view-form-settings.component.html',
  styleUrls: ['./view-form-settings.component.scss']
})
export class ViewFormSettingsComponent implements OnChanges , OnInit{
  toolbar: string = '';
  cardHome: string = '';
  @Input() data : any;
  @Output() color = new EventEmitter();
  @Output() submit = new EventEmitter();
  @Output() nameCompany = new EventEmitter();
  constructor(
    private FormBuilder: FormBuilder,
    private ThemeService : ThemeService
    ){}

  form = this.FormBuilder.group({
    toolbar: [''],
    cardHome: [''],
    name : ['', Validators.required],
    address: ['']
  })

ngOnChanges(): void {
  if(this.data)
  this.setValues();
}

ngOnInit(): void {
  this.form.get('name')?.valueChanges.subscribe(e =>{
    this.nameCompany.emit(e)
  })
}

setValues(){
    this.form.get('name')?.setValue(this.data?.name);
    this.form.get('address')?.setValue(this.data?.address);
    this.toolbar = this.ThemeService.getCustomConfiguration(this.data?.configurations, 'toolbar')?.configuration_value;
    this.cardHome = this.ThemeService.getCustomConfiguration(this.data?.configurations, 'cardHome')?.configuration_value;
    this.form.get('toolbar')?.setValue(this.data?.toolbar);
}

changeColor(color:string,type: string){
 this.form.get(type)?.setValue(color);
 sessionStorage.setItem(type, color);
 this.color.emit({type: type , cfg:color});
}



submitForm(){
  this.submit.emit(this.form.getRawValue());
}
}
