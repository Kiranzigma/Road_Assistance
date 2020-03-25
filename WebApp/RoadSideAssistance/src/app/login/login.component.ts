import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { IResponse } from '../interface/IResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _routes: Router, private appservice: AppServiceService) { }

  ngOnInit(): void {
  }

  authenticate() {
    let params = [];
    params.push('sa');
    params.push('password-2');
    // authenticate the user and let him login
    const val = this.appservice.get<IResponse>('US-AU', params).subscribe(x => {
      if(x.auth == true){
        sessionStorage.setItem("jwt_token",JSON.stringify(x));
        this._routes.navigate(['/layout']);
      }
    });
  }
}
