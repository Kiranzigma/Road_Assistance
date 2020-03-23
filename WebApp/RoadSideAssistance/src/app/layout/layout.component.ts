import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  opened: boolean = false;
  Nav:any[];
  constructor(private _routes: Router) { }
  ngOnInit(): void {
    this.Nav = [{ displayName : 'Profile', route : 'home'},
    {displayName : 'Logout', route : 'login'} ]
  }
  getURL(param : any):void{
    debugger;
    if(param.route == "login"){
      this._routes.navigate(['/login']);
    }
  }
}
