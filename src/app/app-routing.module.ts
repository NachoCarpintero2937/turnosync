import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/public/landing/landing.module').then(
        (m) => m.LandingModule
      ),
  },
  // all routes logged
  {
    path: 'in',
    loadChildren: () => import('./pages/in/in.module').then((m) => m.InModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
