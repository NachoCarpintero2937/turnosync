import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { DialogWspComponent } from './dialog-wsp.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogWspComponent],
  imports: [CommonModule, MaterialModule,FormsModule],
  providers: [DatePipe],
})
export class DialogWspModule {}
