import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewShiftsDiaryComponent } from './view-shifts-diary.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ViewShiftsDiaryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  providers:[DatePipe],
  exports:[ViewShiftsDiaryComponent]
})
export class ViewShiftsDiaryModule { }
