import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class DialogConfirmModule { }
