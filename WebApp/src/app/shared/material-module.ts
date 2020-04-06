import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatFileUploadModule } from 'mat-file-upload';
import {WebcamModule} from 'ngx-webcam';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
// import the modules from the angular material using the full path as it got changed in the version 9
const modules = [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFileUploadModule,
    WebcamModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }
