import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { IResponse } from '../interface/IResponse';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EncryptServiceService } from '../../app/encrypt-service.service';
import { UserServiceService } from '../shared/user-service.service';
import { userResponse } from '../interface/userResponse';
import { verificationResponse } from '../interface/verificationResponse';
import { MustMatch } from '../../app/helpers/must-match.validator';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  view: any;
  registerForm:FormGroup;
  verificationForm:FormGroup;
  submitted:boolean;
  mail: String;

  constructor(private _routes: Router,
    private route: ActivatedRoute,
    private appservice: AppServiceService,
    private EncrDecr: EncryptServiceService,
    private user: UserServiceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    ) { }

  loginForm = new FormGroup({
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
  });

  ngOnInit(): void {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('auth');
    this.urlReader();
    this.submitted=false;
  
    this.registerForm = this.formBuilder.group({
    userFirstName: ['', Validators.required],
    userLastName: ['', Validators.required],
    userType: ['', Validators.required],
    userEmail: ['', [Validators.required, Validators.email]],
    userPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
    }, {
    validator: MustMatch('userPassword', 'confirmPassword')
    });
  
    this.verificationForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    verificationCode: new FormControl('', Validators.required)
    });
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
        sessionStorage.setItem("auth", this.EncrDecr.set('123456$#@$^@1ERF',JSON.stringify(x.user)));
        delete x.user
        sessionStorage.setItem("jwt_token", JSON.stringify(x));
        this._routes.navigate(['/layout']);
      }
    });
  }

  get rf() { return this.registerForm.controls; }

  get vf() { return this.verificationForm.controls;}

  urlReader() {
    this.route.url.subscribe(params => {
      this.view=params[0].path;
      console.log("Current View -- " + this.view);
    })
  }

  signUp(){
    this._routes.navigate(['/signUp']);
  }

  login(){
    this._routes.navigate(['/login']);
  }

  register(){
    this.submitted = true;
    let body = {
      userEmail: this.registerForm.get('userEmail').value,
      userPassword: this.registerForm.get('userPassword').value,
      userType: this.registerForm.get('userType').value,
      userFirstName: this.registerForm.get('userFirstName').value,
      userLastName: this.registerForm.get('userLastName').value
    };

    if(this.registerForm.valid){
        this.appservice.post<userResponse>('US-AU', body).subscribe(y => {
          console.log("Posted User");
          const dialogRef = this.dialog.open(DialogRegister, {
            width: '250px',
            data: {
              mail: this.registerForm.get('userEmail').value
            }
          });
          
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.mail = '';
          });
          this._routes.navigate(['/login']);
        
        })
      } else {
        console.log("Validation Failed");
  }
}

verifyOrResend(buttontype){
  if(buttontype=="Verify"){
  let body = {
    userEmail: this.verificationForm.get('userEmail').value,
    verificationCode: this.verificationForm.get('verificationCode').value
  };
  if(this.verificationForm.valid){
    this.appservice.post<verificationResponse>('US-VE', body).subscribe(y => {
      console.log("User Verified");
      const dialogRef = this.dialog.open(DialogVerify, {
        width: '250px',
        data: {
          mail: this.verificationForm.get('userEmail').value
      }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.mail = '';
      });
      this._routes.navigate(['/login']);
  })
}
} else if(buttontype=="Resend"){
    console.log("In Resend");
    let body = {
      userEmail: this.verificationForm.get('userEmail').value,
    };
    if(this.verificationForm.get('userEmail').valid){
      this.appservice.post<verificationResponse>('US-RVE', body).subscribe(y => {
        console.log("User Verified");
        const dialogRef = this.dialog.open(DialogResend, {
          width: '250px',
          data: {
            mail: this.verificationForm.get('userEmail').value
        }
        });
        
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.mail = '';
        });
        this._routes.navigate(['/login']);
    })
}

}
}



getRegisterErrorMessage(x: any) {
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

  getVerificationErrorMessage(x: any) {
  switch(x) {
    case "userEmail":
      if (this.verificationForm.get('userEmail').hasError('required')) {
        return 'You must enter a value';
      } else if (this.verificationForm.get('userEmail').hasError('email')){
        return this.verificationForm.get('userEmail').hasError('email') ? 'Not a valid email' : '';
      }
    case "verificationCode":
      if (this.verificationForm.get('verificationCode').hasError('required')) {
        return 'You must enter a value';
      }
    }
  }

}




//Dialog PopUp for Register

@Component({
  selector: 'dialog-popupRegister',
  templateUrl: 'dialog-popupRegister.html',
})

export class DialogRegister { 
  constructor(
    public dialogRef: MatDialogRef<DialogRegister>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}

//Dialog PopUp for Verify

@Component({
  selector: 'dialog-popupVerify',
  templateUrl: 'dialog-popupVerify.html',
})

export class DialogVerify { 
  constructor(
    public dialogRef: MatDialogRef<DialogVerify>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}

//Dialog PopUp for Resend
@Component({
  selector: 'dialog-popupResend',
  templateUrl: 'dialog-popupResend.html',
})

export class DialogResend { 
  constructor(
    public dialogRef: MatDialogRef<DialogVerify>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}


