import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './shared/material-module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppServiceService, APIInterceptorService } from './app-service.service';
// for the service to be available across the project
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import {EncryptServiceService} from '../app/encrypt-service.service';
import { UserServiceService } from './shared/user-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // importing the common module material for angular material usage
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: APIInterceptorService, multi: true },
    AppServiceService, EncryptServiceService, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
