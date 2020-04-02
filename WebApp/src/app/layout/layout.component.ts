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
  lat: any;
  long: any;
  location: Object;
  constructor(private _routes: Router, private Appservice : AppServiceService) { }
  ngOnInit(): void {
    this.Nav = [{ displayName : 'Profile', route : 'profile'},
    {displayName : 'Logout', route : 'logout'} ]
    this.Appservice.getLocation().subscribe(
      x => {
        console.log(x.location.lat);
        console.log(x.location.lng);
        this.lat = x.location.lat;
        this.long = x.location.lng;
      }
    );
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
