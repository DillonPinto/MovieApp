import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, RoutingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListsComponent } from './movie-lists/movie-lists.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {WebApiRequestServiceService} from '../services/web-api-request.service.service';
import { MovieCardsComponent } from './movie-cards/movie-cards.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RestApiService} from '../services/rest-api.service';
import {DataSyncService} from '../services/data-sync.service';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { LoginComponent } from './login/login.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from '../services/auth.service';
import {AuthGuard} from '../guards/auth-guard';
import {TokenInterceptor} from './Interceptors/token-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MovieCardsComponent,
    MovieSearchComponent,
    NewListDialogComponent,
    LoginComponent,
    AuthenticateComponent,
    RegisterComponent,
      RoutingComponents
    ],
  entryComponents: [NewListDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    ScrollingModule,
    AppRoutingModule,

  ],
  providers: [WebApiRequestServiceService, RestApiService, DataSyncService],
  bootstrap: [AppComponent]
})
export class AppModule { }
