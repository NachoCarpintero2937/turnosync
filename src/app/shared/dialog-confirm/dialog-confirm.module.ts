import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';



@NgModule({
  declarations: [
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DialogConfirmModule { }
