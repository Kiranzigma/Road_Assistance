import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '../shared/material-module';
import { LayoutRoutingModule } from './layout.routing';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [LayoutComponent, ProfileComponent],
  imports: [
    CommonModule, MaterialModule,LayoutRoutingModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: false})
  ]
})
export class LayoutModule { }
