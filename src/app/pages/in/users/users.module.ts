import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ViewTableUsersComponent } from './views/view-table-users/view-table-users.component';
import { MaterialModule } from 'src/app/common/modules/material/material.module';
import { ViewUserComponent } from './views/view-user/view-user.component';
import { ViewFormUserModule } from './views/view-form-user/view-form-user.module';


@NgModule({
  declarations: [
    UsersComponent,
    ViewTableUsersComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ViewFormUserModule,
    MaterialModule
  ]
})
export class UsersModule { }
