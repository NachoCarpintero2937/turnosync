import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ViewTableClientsComponent } from './views/view-table-clients/view-table-clients.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ViewClientsComponent } from './views/view-clients/view-clients.component';
import { ViewFormClientsComponent } from './views/view-form-clients/view-form-clients.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientsComponent,
    ViewTableClientsComponent,
    ViewClientsComponent,
    ViewFormClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
