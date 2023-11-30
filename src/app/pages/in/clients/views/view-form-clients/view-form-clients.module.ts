import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewFormClientsComponent } from './view-form-clients.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewFormClientsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[ViewFormClientsComponent]
})
export class ViewFormClientsModule { }
