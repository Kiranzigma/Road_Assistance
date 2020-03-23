import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _routes: Router) { }

  ngOnInit(): void {
  }

  authenticate(){
    // authenticate the user and let him login
    this._routes.navigate(['/layout']);
  }
}
