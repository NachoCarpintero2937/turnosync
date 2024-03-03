import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { InicialesModule } from '../iniciales/iniciales.module';
import { ViewNotificationsComponent } from './views/view-notifications/view-notifications.component';
import { ShiftModule } from 'src/app/pages/in/home/shift/shift.module';

@NgModule({
  declarations: [HeaderComponent,ViewNotificationsComponent],
  imports: [CommonModule, MaterialModule, RouterModule, InicialesModule,ShiftModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
