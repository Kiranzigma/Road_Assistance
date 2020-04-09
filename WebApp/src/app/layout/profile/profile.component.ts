import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validator, AbstractControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isBuffer } from 'util';
import { FitBoundsAccessor } from '@agm/core';
import { AppServiceService } from '../../app-service.service';
import { Iuser } from 'src/app/interface/IResponse';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { MustMatch } from '../../helpers/must-match.validator';
import { EncryptServiceService } from 'src/app/encrypt-service.service';
import { userResponse } from 'src/app/interface/userResponse';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  name = 'Angular 9';
  url = '';
  title : string = "Update Profile";
  firstName:any;
  updateForm : FormGroup;

  // validationMessages= {
  //   'firstName' :{
  //     'required' : 'First Name is required',
  //     'minLength' : 'First Name must be greater than 2 characters',
  //     'maxLength' : 'First Name must be lesser than 30 characters'
  //   },
  //   'lastName' :{
  //     'required' : 'Last Name is required',
  //     'minLength' : 'Last Name must be greater than 2 characters',
  //     'maxLength' : 'Last Name must be lesser than 30 characters'
  //   },
  //   'mobile' : {
  //     'minLength' : 'Please enter a correct input',
  //   }

  // } 
  //   // 'email' :{
  //   //   'required' : 'Email is required',
  //   //   'emailDomain' : 'Please enter a valid mailid'
  //   // },
  // //   'password : 'Password is req'
  // // }

  constructor(private fb: FormBuilder,
    private userService: UserServiceService,
    private appservice: AppServiceService,
    private EncrDecr: EncryptServiceService) {}
  
  ngOnInit():void{
    this.updateForm = this.fb.group({
      firstName : [this.userService.getUser().userFirstName,[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      lastName : [this.userService.getUser().userLastName,[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      email : [this.userService.getUser().userEmail],
      mobile : [this.userService.getUser().userMobileNumber,[Validators.minLength(10),Validators.maxLength(10)]],
      gender : [this.userService.getUser().userGender],
      password : [this.userService.getUser().userPassword],
      newPassword : ['', [Validators.minLength(6)]],
      confirmPassword : ['',[Validators.minLength(6)]]
    }, {
      validator: MustMatch('newPassword','confirmPassword')
      });
 
  }
 
  get rf() { return this.updateForm.controls; }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]); // read file as data url
  
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url  = event.target.result as string;
      }
    }
  }
  public delete(){
    this.url = null;
  }


updateUser(){
  let body = {
    userFirstName: this.updateForm.get('firstName').value,
    userLastName: this.updateForm.get('lastName').value,
    userGender: this.updateForm.get('gender').value,
    userMobileNumber: this.updateForm.get('mobile').value,
    userPassword:this.updateForm.get('newPassword').value ? this.EncrDecr.set('123456$#@$^@1ERF',this.updateForm.get('newPassword').value) : this.userService.getUser().userPassword ,
  };
  

  if(this.updateForm.valid){
    let arr=[];
    arr.push(this.userService.getUser().id);
    this.appservice.put<Iuser>('US-AU',body,arr).subscribe(y=> {
      console.log(y);
      alert('Details have been updated successfully')
    });

  }
}

// function emailDomain (control: AbstractControl):{ [key:string] : any } | null {
//   const email: string = control.value;
//   const domain = email.substring(email.lastIndexOf('.'+1));
//   if(domain.toLowerCase() === 'com' || 
//   domain.toLowerCase() === 'edu'|| 
//   domain.toLowerCase() === 'gov'|| 
//   domain.toLowerCase() === 'net'){
//     return null;
//   }else {
//     return {
//       'emailDomain': true};
//     }
//   }




getUpdateErrorMessage(x: any) {
  switch(x) {
    case "firstName":
      if (this.updateForm.get('firstName').hasError('required')) {
        return 'You must enter a value';
      }
      else if(this.updateForm.get('firstName').hasError('minLength')) {
        return this.updateForm.get('firstName').hasError ('minLength')? 'First Name should be atleast of 3 characters' : '';
      }
      else if(this.updateForm.get('firstName').hasError('maxLength')) {
        return this.updateForm.get('firstName').hasError ('maxLength')? 'First Name can be only to a max of 30 characters' : '';
      }
    case "lastName":
      if (this.updateForm.get('lastName').hasError('required')) {
        return 'You must enter a value';
      }
      else if(this.updateForm.get('lastName').hasError('minLength')) {
        return this.updateForm.get('lastName').hasError ('minLength')? 'Last Name should be atleast of 3 characters' : '';
      }
      else if(this.updateForm.get('lastName').hasError('maxLength')) {
        return this.updateForm.get('lastName').hasError ('maxLength')? 'Last Name can be only to a max of 30 characters' : '';
      }
    case "mobileNumber":
      if(this.updateForm.get('mobile').hasError('minLength')) {
        return this.updateForm.get('mobile').hasError ('minLength')? 'Please enter a valid mobile number' : '';
      }
      case "newPassword":
        if (this.updateForm.get('newPassword').hasError('minlength')){
          return this.updateForm.get('newPassword').hasError('minlength') ? 'Password short (6 or more characters)' : '';
        }
      case "confirmPassword":
        if (this.updateForm.get('confirmPassword').hasError('mustMatch')){
          return this.updateForm.get('confirmPassword').hasError('mustMatch') ? 'Passwords don\'t match' : '';
        }

    }
}
}