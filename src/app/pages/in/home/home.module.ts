import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { DialogWspModule } from 'src/app/shared/dialog-wsp/dialog-wsp.module';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [HomeComponent, InfoCardsComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, DialogWspModule,ClipboardModule ],
})
export class HomeModule { }
