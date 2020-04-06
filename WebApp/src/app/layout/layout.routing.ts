import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestVendorComponent } from './request-vendor/request-vendor.component';
import { AuthGuard } from '../auth-guard.service';
import { UserRequestComponent } from './user-request/user-request.component';

const routes: Routes = [
    {
      path:'',
      component:LayoutComponent,
      children:[
        {path: 'Profile', component: ProfileComponent},
        {path: 'RequestVendor', component: RequestVendorComponent,canActivate: [AuthGuard], data:{expectedRole : 'user'}},
        {path: 'UserRequestComponent', component: UserRequestComponent,canActivate: [AuthGuard], data:{expectedRole : 'vendor'}},
        {path: '**', redirectTo:'Profile'}
      ],
    },
 ];

 @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })

export class LayoutRoutingModule { }