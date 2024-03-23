import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ViewTableUsersComponent } from './views/view-table-users/view-table-users.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ViewUserComponent } from './views/view-user/view-user.component';
import { ViewFormUserModule } from './views/view-form-user/view-form-user.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ViewRoleComponent } from './views/view-role/view-role.component';
import { ViewFormRoleComponent } from './views/view-form-role/view-form-role.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewTableRolesComponent } from './views/view-table-roles/view-table-roles.component';


@NgModule({
  declarations: [
    UsersComponent,
    ViewTableUsersComponent,
    ViewUserComponent,
    ViewRoleComponent,
    ViewFormRoleComponent,
    ViewTableRolesComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ViewFormUserModule,
    MaterialModule,
    NgxPermissionsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
