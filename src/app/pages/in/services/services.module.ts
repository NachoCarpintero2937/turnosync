import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ViewTableServicesComponent } from './views/view-table-services/view-table-services.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';


@NgModule({
  declarations: [
    ServicesComponent,
    ViewTableServicesComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MaterialModule
  ]
})
export class ServicesModule { }
