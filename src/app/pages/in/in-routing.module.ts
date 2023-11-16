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
  {
    path: 'clients',
    loadChildren: () =>
      import('../../pages/in/clients/clients.module').then((m) => m.ClientsModule),
  },
  {
    path: 'shifts',
    loadChildren: () =>
      import('../../pages/in/shifts/shifts.module').then((m) => m.ShiftsModule),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('../../pages/in/services/services.module').then((m) => m.ServicesModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../pages/in/users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InRoutingModule {}
