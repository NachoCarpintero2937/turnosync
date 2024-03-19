import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewShiftsDiaryComponent } from './view-shifts-diary.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';




@NgModule({
  declarations: [
    ViewShiftsDiaryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgxPermissionsModule
  ],
  providers:[DatePipe],
  exports:[ViewShiftsDiaryComponent]
})
export class ViewShiftsDiaryModule { }
