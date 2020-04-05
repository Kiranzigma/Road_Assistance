import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '../shared/material-module';
import { LayoutRoutingModule } from './layout.routing';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AppServiceService } from '../app-service.service';
import {AgmCoreModule} from '@agm/core';
import { RequestVendorComponent } from './request-vendor/request-vendor.component'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, ProfileComponent, RequestVendorComponent],
  imports: [
    CommonModule, MaterialModule,LayoutRoutingModule,ReactiveFormsModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: false}), HttpClientModule,FormsModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo'
    })
  ],
  providers:[AppServiceService]
})
export class LayoutModule { }
