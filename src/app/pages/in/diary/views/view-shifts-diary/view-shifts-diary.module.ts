import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewShiftsDiaryComponent } from './view-shifts-diary.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';



@NgModule({
  declarations: [
    ViewShiftsDiaryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers:[DatePipe],
  exports:[ViewShiftsDiaryComponent]
})
export class ViewShiftsDiaryModule { }
