import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ViewTableClientsComponent } from './views/view-table-clients/view-table-clients.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ViewClientsComponent } from './views/view-clients/view-clients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewFormClientsModule } from './views/view-form-clients/view-form-clients.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    ClientsComponent,
    ViewTableClientsComponent,
    ViewClientsComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ViewFormClientsModule,
    NgxPermissionsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' },  { provide: LOCALE_ID, useValue: 'es' },], 
})
export class ClientsModule { }
