import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaingsComponent } from './campaings.component';

const routes: Routes = [
  {
    path: '',
    component: CampaingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaingsRoutingModule { }
