import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientInterceptor } from './http-client-interceptor';
import { PostfeedComponent } from './postfeed/postfeed.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { RegisterSuccessComponent } from './user/register-success/register-success.component';
import { RegisterComponent } from './user/register/register.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    AddPostComponent,
    LogoutComponent,
    PostfeedComponent,
    AdminLandingComponent,
    UserListComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true},
              HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {  }
