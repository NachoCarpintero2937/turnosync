import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsComponent } from './shifts.component';
import { ViewTableShiftsComponent } from './views/view-table-shifts/view-table-shifts.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ClientsModule } from '../clients/clients.module';


@NgModule({
  declarations: [
    ShiftsComponent,
    ViewTableShiftsComponent
  ],
  imports: [
    CommonModule,
    ShiftsRoutingModule,
    ClientsModule,
    MaterialModule
  ]
})
export class ShiftsModule { }
