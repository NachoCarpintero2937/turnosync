import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { InfoCardsComponent } from './info-cards/info-cards.component';

@NgModule({
  declarations: [HomeComponent, InfoCardsComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule],
})
export class HomeModule {}
