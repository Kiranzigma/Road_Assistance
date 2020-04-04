import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { IResponse } from '../interface/IResponse';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EncryptServiceService } from '../../app/encrypt-service.service';
import { userResponse } from '../interface/userResponse';
import { MustMatch } from '../../app/helpers/must-match.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  view: any;
  registerForm:FormGroup;
  submitted:boolean;

  constructor(private _routes: Router,
    private route: ActivatedRoute,
    private appservice: AppServiceService,
    private EncrDecr: EncryptServiceService,
    private formBuilder: FormBuilder) { }

  loginForm = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  });

  ngOnInit(): void {
   this.urlReader();
   this.submitted=false;
   this.registerForm = this.formBuilder.group({
    userFirstName: ['', Validators.required],
    userLastName: ['', Validators.required],
    userEmail: ['', [Validators.required, Validators.email]],
    userPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
    }, {
    validator: MustMatch('userPassword', 'confirmPassword')
    });
  }

  get rf() { return this.registerForm.controls; }

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

  login(){
    this._routes.navigate(['\login']);
  }

  register(){
    this.submitted = true;
    let body = {
      userEmail: this.registerForm.get('userEmail').value,
      userPassword: this.EncrDecr.set('123456$#@$^@1ERF', this.registerForm.get('userPassword').value),
      userFirstName: this.registerForm.get('userFirstName').value,
      userLastName: this.registerForm.get('userLastName').value
    };

    if(this.registerForm.valid){
          this.appservice.post<userResponse>('US-AU', body).subscribe(y => {
          console.log("Posted");
        })
    } else {
          console.log("Validation Failed");
    }
  }

  
  getErrorMessage(x: any) {
    //console.log(x);
    console.log(this.registerForm.controls);
    //console.log(this.registerForm.get('confirmPassword'));
    switch(x) {
      case "userFirstName":
        if (this.registerForm.get('userFirstName').hasError('required')) {
          return 'You must enter a value';
        }
      case "userEmail":
        if (this.registerForm.get('userEmail').hasError('required')) {
          return 'You must enter a value';
        } else if (this.registerForm.get('userEmail').hasError('email')){
          return this.registerForm.get('userEmail').hasError('email') ? 'Not a valid email' : '';
        }
      case "userLastName":
        if (this.registerForm.get('userLastName').hasError('required')) {
          return 'You must enter a value';
        }
      case "userPassword":
        if (this.registerForm.get('userPassword').hasError('required')) {
          return 'You must enter a value';
        } else
        if (this.registerForm.get('userPassword').hasError('minlength')){
          return this.registerForm.get('userPassword').hasError('minlength') ? 'Password too short (8 or more)' : '';
        }
      case "confirmPassword":
        if (this.registerForm.get('confirmPassword').hasError('required')) {
          return 'You must enter a value';
        } else
        if (this.registerForm.get('confirmPassword').hasError('mustMatch')){
          return this.registerForm.get('confirmPassword').hasError('mustMatch') ? 'Passwords don\'t match' : '';
        }
    }      
  }
}
