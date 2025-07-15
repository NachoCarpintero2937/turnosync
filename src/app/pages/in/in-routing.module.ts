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
  {
    path: 'reports',
    loadChildren: () =>
      import('../../pages/in/reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../../pages/in/profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InRoutingModule {}
