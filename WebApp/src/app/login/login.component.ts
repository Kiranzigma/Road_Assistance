import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { IResponse } from '../interface/IResponse';
import { FormGroup, FormControl } from '@angular/forms';
import { EncryptServiceService } from '../../app/encrypt-service.service';
import { userResponse } from '../interface/userResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  view: any;

  constructor(private _routes: Router,
    private route: ActivatedRoute,
    private appservice: AppServiceService,
    private EncrDecr: EncryptServiceService) { }

  loginForm = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  });

  registerForm = new FormGroup({
    userName: new FormControl(''),
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  });

  ngOnInit(): void {
   this.urlReader();
  }

  urlReader() {
    this.route.url.subscribe(params => {
      this.view=params[0].path;
      console.log("Current View -- " + this.view);
    })
  }

  authenticate() {
    let params = [];
    params.push(this.loginForm.get('userEmail').value);
    let body = {
      userPassword: this.EncrDecr.set('123456$#@$^@1ERF', this.loginForm.get('userPassword').value)
    }
    // authenticate the user and let him login
    const val = this.appservice.post<IResponse>('US-AU', body, params).subscribe(x => {
      if (x.auth == true) {
        sessionStorage.setItem("jwt_token", JSON.stringify(x));
        this._routes.navigate(['/layout']);
      }
    });
  }

  signUp(){
    this._routes.navigate(['\signUp']);
  }

  register(){
    let userName = this.registerForm.get('userName');
    let userEmail = this.registerForm.get('userEmail');
    let userPassword = this.registerForm.get('userPassword')
    console.log(this.registerForm.get('userName'));
    console.log(this.registerForm.get('userEmail'));
    console.log(this.registerForm.get('userPassword'));
    let body = {
      userEmail: this.registerForm.get('userEmail').value,
      userPassword: this.EncrDecr.set('123456$#@$^@1ERF', this.registerForm.get('userPassword').value)
    };

    if(userName!=null&&body.userEmail!=null&&body.userPassword!=null){
        this.appservice.post<userResponse>('US-AU', body).subscribe(y => {
          console.log("Posted");
        })
    }
  }
}
