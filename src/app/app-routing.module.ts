import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/public/landing/landing.module').then(
        (m) => m.LandingModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/public/login/login.module').then((m) => m.LoginModule),
  },
  // all routes logged
  {
    path: 'in',
    loadChildren: () => import('./pages/in/in.module').then((m) => m.InModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
