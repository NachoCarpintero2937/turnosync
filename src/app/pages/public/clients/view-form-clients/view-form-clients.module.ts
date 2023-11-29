import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFormClientsComponent } from './view-form-clients.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';



@NgModule({
  declarations: [
    ViewFormClientsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[ViewFormClientsComponent]
})
export class ViewFormClientsModule { }
