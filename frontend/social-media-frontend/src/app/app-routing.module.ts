import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostfeedComponent } from './postfeed/postfeed.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterSuccessComponent } from './user/register-success/register-success.component';
import { RegisterComponent } from './user/register/register.component';
import { ViewPostComponent } from './view-post/view-post.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: 'register',
    component : RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-success',
    component : RegisterSuccessComponent
  },
  {
    path: 'add-post',
    component : AddPostComponent, canActivate: [AuthGuard]
  },
  {
    path: 'postfeed',
    component : PostfeedComponent, canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component : ViewPostComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin-landing',
    component : AdminLandingComponent, canActivate: [AdminGuard]
  },
  {
    path: 'user-list',
    component : UserListComponent, canActivate: [AdminGuard]
  },
  {
    path: 'post-list',
    component : PostListComponent, canActivate: [AdminGuard]
  },
  {
    path: "**",
    component : HomeComponent
  },
  // { path: '',
  // redirectTo: 'home',
  // pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
