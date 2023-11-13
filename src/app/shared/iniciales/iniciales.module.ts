import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicialesComponent } from './iniciales.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [InicialesComponent],
  imports: [CommonModule, PipesModule],
  exports: [InicialesComponent],
})
export class InicialesModule {}
