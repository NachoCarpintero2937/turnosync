import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftComponent } from './shift.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ShiftComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[ShiftComponent]
})
export class ShiftModule { }
