import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ViewTableClientsComponent } from './views/view-table-clients/view-table-clients.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';


@NgModule({
  declarations: [
    ClientsComponent,
    ViewTableClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule
  ]
})
export class ClientsModule { }
