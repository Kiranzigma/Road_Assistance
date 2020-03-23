import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '../shared/material-module';
import { LayoutRoutingModule } from './layout.routing';
@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule, MaterialModule,LayoutRoutingModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: false})
  ]
})
export class LayoutModule { }
