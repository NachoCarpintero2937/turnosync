import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../../pages/in/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'diary',
    loadChildren: () =>
      import('../../pages/in/diary/diary.module').then((m) => m.DiaryModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InRoutingModule {}
