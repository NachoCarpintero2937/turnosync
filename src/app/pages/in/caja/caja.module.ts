import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaComponent } from './caja.component';
import { ViewCajaResumenComponent } from './views/view-caja-resumen/view-caja-resumen.component';
import { ViewCajaSemanasComponent } from './views/view-caja-semanas/view-caja-semanas.component';
import { ViewCajaManualComponent } from './views/view-caja-manual/view-caja-manual.component';
import { ViewCajaIaComponent } from './views/view-caja-ia/view-caja-ia.component';

@NgModule({
  declarations: [
    CajaComponent,
    ViewCajaResumenComponent,
    ViewCajaSemanasComponent,
    ViewCajaManualComponent,
    ViewCajaIaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CajaRoutingModule,
  ],
  providers: [DatePipe],
})
export class CajaModule {}
