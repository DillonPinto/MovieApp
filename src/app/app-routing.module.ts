import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieListsComponent} from './movie-lists/movie-lists.component';
import {LoginComponent} from './login/login.component';
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from '../guards/auth-guard';
import {DashboardGuard} from '../guards/dashboard-guard';
import {AuthService} from '../services/auth.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './Interceptors/token-interceptor';

// Stores paths and corresponding components for app routes
const routes: Routes = [
  {path: 'dashboard', component: MovieListsComponent, canActivate: [DashboardGuard]},
  {path: 'authenticate',  component: AuthenticateComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/authenticate', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService, DashboardGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}]
})

export class AppRoutingModule { }
export const RoutingComponents = [MovieListsComponent, AuthenticateComponent, LoginComponent,
  RegisterComponent];
