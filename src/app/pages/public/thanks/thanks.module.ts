import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThanksRoutingModule } from './thanks-routing.module';
import { ThanksComponent } from './thanks.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';


@NgModule({
  declarations: [
    ThanksComponent
  ],
  imports: [
    CommonModule,
    ThanksRoutingModule,
    MaterialModule
  ]
})
export class ThanksModule { }
