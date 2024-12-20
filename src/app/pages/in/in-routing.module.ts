import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissOnly } from 'src/app/guards/permissonly';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../../pages/in/home/home.module').then((m) => m.HomeModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_HOME']
        }
      }
  },
  {
    path: 'diary',
    loadChildren: () =>
      import('../../pages/in/diary/diary.module').then((m) => m.DiaryModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_DIARY']
        }
      }
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('../../pages/in/clients/clients.module').then((m) => m.ClientsModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_CLIENTS']
        }
      }
  },
  {
    path: 'shifts',
    loadChildren: () =>
      import('../../pages/in/shifts/shifts.module').then((m) => m.ShiftsModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_SHIFTS']
        }
      }
  },
  {
    path: 'services',
    loadChildren: () =>
      import('../../pages/in/services/services.module').then((m) => m.ServicesModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_SERVICES']
        }
      }
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../pages/in/users/users.module').then((m) => m.UsersModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_USERS']
        }
      }
  },
  {
    path: 'users/:role',
    loadChildren: () =>
      import('../../pages/in/users/users.module').then((m) => m.UsersModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_USERS']
        }
      }
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('../../pages/in/reports/reports.module').then((m) => m.ReportsModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_REPORTS']
        }
      }
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../../pages/in/profile/profile.module').then((m) => m.ProfileModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_PROFILE']
        }
      }
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../../pages/in/settings/settings.module').then((m) => m.SettingsModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_SETTINGS']
        }
      }
  },
  {
    path: 'campaigns',
    loadChildren: () =>
      import('../../pages/in/campaings/campaings.module').then((m) => m.CampaingsModule),
      canActivate: [PermissOnly],
      data: {
        permissions: {
          only: ['VIEW_CAMPAIGNS']
        }
      }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InRoutingModule {}
