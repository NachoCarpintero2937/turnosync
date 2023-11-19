import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogWspModule } from 'src/app/shared/dialog-wsp/dialog-wsp.module';
import { ViewShiftsDiaryModule } from './views/view-shifts-diary/view-shifts-diary.module';

@NgModule({
  declarations: [DiaryComponent],
  imports: [CommonModule, DiaryRoutingModule, MaterialModule, DialogWspModule,ViewShiftsDiaryModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' },DatePipe],
})
export class DiaryModule {}
