import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicialesPipe } from './iniciales.pipe';
import { ArgentinePesoPipe } from './argentinepeso.pipe';



@NgModule({
  declarations: [
    InicialesPipe,
    ArgentinePesoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [InicialesPipe, ArgentinePesoPipe]
})
export class PipesModule { }
