import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsComponent } from './shifts.component';


@NgModule({
  declarations: [
    ShiftsComponent
  ],
  imports: [
    CommonModule,
    ShiftsRoutingModule
  ]
})
export class ShiftsModule { }
