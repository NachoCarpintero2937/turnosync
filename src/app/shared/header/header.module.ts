import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { InicialesModule } from '../iniciales/iniciales.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule, InicialesModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
