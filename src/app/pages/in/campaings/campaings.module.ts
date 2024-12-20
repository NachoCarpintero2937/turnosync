import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaingsRoutingModule } from './campaings-routing.module';
import { CampaingsComponent } from './campaings.component';
import { ViewFormCampaignsComponent } from './views/view-form-campaigns/view-form-campaigns.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CampaingsComponent,
    ViewFormCampaignsComponent
  ],
  imports: [
    CommonModule,
    CampaingsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CampaingsModule { }
