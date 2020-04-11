import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { UserServiceService } from '../shared/user-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  opened: boolean = false;
  Nav:any[];
  constructor(private _routes: Router, private Appservice : AppServiceService, private userService : UserServiceService) { }
  ngOnInit(): void {
     if(this.userService.getUser().userType == "user"){
      this.Nav = [
        { icon: 'commute', displayName : 'Request Mechanic', route : 'RequestVendor', data: 'user'},
        { icon:'storage', displayName : 'History', route : 'history', data: 'user'}, 
        { icon: 'account_circle', displayName : 'Profile', route : 'Profile', data: 'general'},
        { icon:'power_settings_new', displayName : 'Logout', route : 'logout', data: 'general'} ];
    }else if(this.userService.getUser().userType == "vendor"){
      this.Nav = [
        { icon: 'commute', displayName : 'Requests', route : 'UserRequestComponent', data: 'vendor'},
        { icon: 'account_circle', displayName : 'Profile', route : 'Profile', data: 'general'},
        { icon:'power_settings_new', displayName : 'Logout', route : 'logout', data: 'general'} ];
    }
  } 
 
  getURL(param : any):void{
    this.opened = ! this.opened;
    if(param.route == "logout"){
      sessionStorage.removeItem('jwt_token');
      sessionStorage.removeItem('auth');
      this._routes.navigate(['/login']);
    }else{
      this._routes.navigate(["/layout/" + param.route]);
    }
  }
}
