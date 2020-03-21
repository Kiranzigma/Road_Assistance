import { NgModule } from '@angular/core';
import {
    MatCardModule,
} from '@angular/material/card';
import {
    MatInputModule,
} from '@angular/material/input';
import {
    MatButtonModule,
} from '@angular/material/button';

// import the modules from the angular material using the full path as it got changed in the version 9
const modules = [
    MatCardModule,
    MatInputModule,
    MatButtonModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }
