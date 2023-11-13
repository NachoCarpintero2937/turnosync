import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { DialogWspComponent } from './dialog-wsp.component';

@NgModule({
  declarations: [DialogWspComponent],
  imports: [CommonModule, MaterialModule],
  providers: [DatePipe],
})
export class DialogWspModule {}
