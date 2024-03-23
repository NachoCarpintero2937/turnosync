import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './views/view-user/view-user.component';
import { ViewRoleComponent } from './views/view-role/view-role.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'view-user',
    component: ViewUserComponent
  },
  {
    path: 'view-role',
    component: ViewRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
