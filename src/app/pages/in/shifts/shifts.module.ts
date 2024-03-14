import { NgModule } from '@angular/core';
import { CommonModule ,CurrencyPipe,DatePipe} from '@angular/common';

import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsComponent } from './shifts.component';
import { ViewTableShiftsComponent } from './views/view-table-shifts/view-table-shifts.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ClientsModule } from '../clients/clients.module';
import { ViewShiftComponent } from './views/view-shift/view-shift.component';
import { ViewFormShiftsComponent } from './views/view-form-shifts/view-form-shifts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ShiftModule } from '../home/shift/shift.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ArgentinePesoPipe } from 'src/app/pipes/argentinepeso.pipe';
import { ViewSelectedShiftsComponent } from './views/view-selected-shifts/view-selected-shifts.component';

@NgModule({
  declarations: [
    ShiftsComponent,
    ViewTableShiftsComponent,
    ViewShiftComponent,
    ViewFormShiftsComponent,
    ViewSelectedShiftsComponent
  ],
  imports: [
    CommonModule,
    ShiftsRoutingModule,
    ClientsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.setOpts('ar-ES', 'AR'),
    ShiftModule,
    PipesModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' },DatePipe,CurrencyPipe,ArgentinePesoPipe], 
})
export class ShiftsModule { }
