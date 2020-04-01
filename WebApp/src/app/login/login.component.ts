import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { IResponse } from '../interface/IResponse';
import { FormGroup, FormControl } from '@angular/forms';
import {EncryptServiceService} from '../../app/encrypt-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _routes: Router, 
    private appservice: AppServiceService,
    private EncrDecr: EncryptServiceService) { }
  
  loginForm = new FormGroup({
    userEmail :  new FormControl(''),
    userPassword : new FormControl(''),
  });

  ngOnInit(): void {
  }

  authenticate() {
    let params = [];
    params.push(this.loginForm.get('userEmail').value);
    let body = {
      userPassword : this.EncrDecr.set('123456$#@$^@1ERF', this.loginForm.get('userPassword').value)
    }
    // authenticate the user and let him login
    const val = this.appservice.post<IResponse>('US-AU', body, params).subscribe(x => {
      if(x.auth == true){
        sessionStorage.setItem("jwt_token",JSON.stringify(x));
        this._routes.navigate(['/layout']);
      }
    });
  }
}
