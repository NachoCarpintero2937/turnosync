import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ViewTableServicesComponent } from './views/view-table-services/view-table-services.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ViewServiceComponent } from './views/view-service/view-service.component';
import { ViewFormServiceComponent } from './views/view-form-service/view-form-service.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ServicesComponent,
    ViewTableServicesComponent,
    ViewServiceComponent,
    ViewFormServiceComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ServicesModule { }
