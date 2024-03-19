import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/public/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/public/landing/landing.module').then(
        (m) => m.LandingModule
      ),
  },
  {
    path: 'login/:companyId',
    loadChildren: () =>
      import('./pages/public/login/login.module').then((m) => m.LoginModule),
    component: LoginComponent // Puedes especificar el componente aquí si necesitas pasar el parámetro opcional a un componente
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/public/login/login.module').then((m) => m.LoginModule),
    component: LoginComponent // Puedes especificar el componente aquí si necesitas manejar la ruta sin parámetros
  },
  {
    path: 'clients/:id',
    loadChildren: () =>
      import('./pages/public/clients/clients.module').then((m) => m.ClientsModule),
  },
  {
    path: 'thanks',
    loadChildren: () =>
      import('./pages/public/thanks/thanks.module').then((m) => m.ThanksModule),
  },
  // all routes logged
  {
    path: 'in',
    loadChildren: () => import('./pages/in/in.module').then((m) => m.InModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
