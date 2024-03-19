import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftComponent } from './shift.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [
    ShiftComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxPermissionsModule,
    RouterModule
  ],
  exports:[ShiftComponent]
})
export class ShiftModule { }
