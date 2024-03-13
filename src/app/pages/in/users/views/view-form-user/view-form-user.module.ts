import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFormUserComponent } from './view-form-user.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ViewFormUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[ViewFormUserComponent]
})
export class ViewFormUserModule { }
