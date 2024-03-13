import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewFormSettingsComponent } from './view-form-settings.component';
import { NgxColorsModule } from 'ngx-colors';


@NgModule({
  declarations: [
    ViewFormSettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxColorsModule
  ],
  exports:[ViewFormSettingsComponent]
})
export class ViewFormSettingsModule { }
