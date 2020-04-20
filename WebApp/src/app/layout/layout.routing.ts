import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestVendorComponent } from './request-vendor/request-vendor.component';
import { AuthGuard } from '../auth-guard.service';
import { UserRequestComponent } from './user-request/user-request.component';
import { HistoryComponent } from './history/history.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { BillingComponent } from './billing/billing.component';
import { VendorAnalyticsComponent } from './vendor-analytics/vendor-analytics.component';

const routes: Routes = [
    {
      path:'',
      component:LayoutComponent,
      children:[
        {path: 'Profile', component: ProfileComponent},
        {path: 'RequestVendor', component: RequestVendorComponent,canActivate: [AuthGuard], data:{expectedRole : 'user'}},
        {path: 'UserRequestComponent', component: UserRequestComponent,canActivate: [AuthGuard], data:{expectedRole : 'vendor'}},
        {path: 'history', component: HistoryComponent,canActivate: [AuthGuard], data:{expectedRole : 'user'}},
        {path: 'RequestDetailsComponent', component:RequestDetailsComponent ,canActivate: [AuthGuard], data:{expectedRole : 'vendor'}},
        {path: 'vendorAnalytics', component: VendorAnalyticsComponent ,canActivate: [AuthGuard], data:{expectedRole : 'vendor'}},
        {path: 'bill', component:BillingComponent ,canActivate: [AuthGuard], data:{expectedRole : 'vendor'}},
        {path: '**', canActivate : [AuthGuard], data: {isRoute : "true"}}
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