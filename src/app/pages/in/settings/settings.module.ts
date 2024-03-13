import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ViewFormSettingsModule } from './views/view-form-settings/view-form-settings.module';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    ViewFormSettingsModule,
    CommonModule,
    MaterialModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
