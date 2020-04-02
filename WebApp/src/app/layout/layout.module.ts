import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '../shared/material-module';
import { LayoutRoutingModule } from './layout.routing';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AppServiceService } from '../app-service.service';
import {AgmCoreModule} from '@agm/core'

@NgModule({
  declarations: [LayoutComponent, ProfileComponent],
  imports: [
    CommonModule, MaterialModule,LayoutRoutingModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: false}), HttpClientModule, 
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo'
    })
  ],
  providers:[AppServiceService]
})
export class LayoutModule { }
