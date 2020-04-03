import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  opened: boolean = false;
  Nav:any[];
  
  constructor(private _routes: Router, private Appservice : AppServiceService) { }
  ngOnInit(): void {
    this.Nav = [{ displayName : 'Profile', route : 'Profile'},
    { displayName : 'Request Repair', route : 'PequestVendor'},
    { displayName : 'Logout', route : 'logout'} ]
  } 
 
  getURL(param : any):void{
    if(param.route == "logout"){
      sessionStorage.removeItem('jwt_token');
      this._routes.navigate(['/login']);
    }else{
      this._routes.navigate(["/layout/" + param.route]);
    }
  }
}
