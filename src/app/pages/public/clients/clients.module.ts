import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ViewFormClientsModule } from '../../in/clients/views/view-form-clients/view-form-clients.module';


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ViewFormClientsModule
  ]
})
export class ClientsModule { }
