import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftsComponent } from './shifts.component';
import { ViewShiftComponent } from './views/view-shift/view-shift.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftsComponent
  },
  {
    path: 'create-shift',
    component: ViewShiftComponent
  },
  {
    path : 'view-shift/:id',
    component: ViewShiftComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftsRoutingModule { }
