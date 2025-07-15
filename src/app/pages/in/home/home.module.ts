import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { DialogWspModule } from 'src/app/shared/dialog-wsp/dialog-wsp.module';
import { ClipboardModule } from 'ngx-clipboard';
import { DialogConfirmModule } from 'src/app/shared/dialog-confirm/dialog-confirm.module';
import { ServicesTodayComponent } from './services-today/services-today.component';
import { EmployeesComponent } from './employees/employees.component';
import { ClientsBirthdayComponent } from './clients-birthday/clients-birthday.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ShiftModule } from './shift/shift.module';
registerLocaleData(localeEs);

@NgModule({
  declarations: [HomeComponent, InfoCardsComponent, ServicesTodayComponent, EmployeesComponent, ClientsBirthdayComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, DialogWspModule,ClipboardModule,DialogConfirmModule,ShiftModule ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class HomeModule { }
