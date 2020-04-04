import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './shared/material-module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppServiceService } from './app-service.service';
// for the service to be available across the project
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import {EncryptServiceService} from '../app/encrypt-service.service';
<<<<<<< Updated upstream
import { UserServiceService } from './shared/user-service.service';
=======
import { UserRequestComponent } from './user-request/user-request.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRequestComponent
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
  providers: [AppServiceService, EncryptServiceService, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
