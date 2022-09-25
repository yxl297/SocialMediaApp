import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserlistComponent } from './userlist/userlist.component';
import { PostlistComponent } from './postlist/postlist.component';


@NgModule({
  declarations: [
    AdminLandingComponent,
    AdminHeaderComponent,
    UserlistComponent,
    PostlistComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule
  ]
})
export class AdministratorModule { }
