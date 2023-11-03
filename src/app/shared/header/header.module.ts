import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule],
})
export class HeaderModule {}
