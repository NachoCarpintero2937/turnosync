import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-form-settings',
  templateUrl: './view-form-settings.component.html',
  styleUrls: ['./view-form-settings.component.scss']
})
export class ViewFormSettingsComponent implements OnInit{
  colorPrimary: string = '';
  colorSecondary: string = '';
  @Output() color = new EventEmitter();
  constructor(private FormBuilder: FormBuilder){}

  form = this.FormBuilder.group({
    color_primary: ['', Validators.required],
    color_secondary: ['', Validators.required],
    name : ['', Validators.required]
  })

ngOnInit(): void {
  
}
changeColor(data:any){
  this.color.emit(data);
}
}
