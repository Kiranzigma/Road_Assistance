import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  validationMessages= {
    'firstName' :{
      'required' : 'First Name is required',
      'minLength' : 'First Name must be greater than 2 characters',
      'maxLength' : 'First Name must be lesser than 30 characters'
    }
  } 
    // 'email' :{
    //   'required' : 'Email is required',
    //   'emailDomain' : 'Please enter a valid mailid'
    // },
  //   'password : 'Password is req'
  // }

  constructor(private fb: FormBuilder,
    private userService: UserServiceService,
    private appservice: AppServiceService,
    private EncrDecr: EncryptServiceService) {}
  
  ngOnInit():void{
    this.updateForm = this.fb.group({
      firstName : [this.userService.getUser().userFirstName,[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      lastName : [this.userService.getUser().userLastName,[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      email : [this.userService.getUser().userEmail],
      mobile : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      gender : [''],
      password : [this.userService.getUser().userPassword],
      newPassword : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', Validators.required]
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
    userFirstName: this.updateForm.get('userFirstName').value,
    userLastName: this.updateForm.get('userLastName').value,
    gender: this.updateForm.get('gender').value,
    mobile: this.updateForm.get('mobile').value,
    newPassword:this.updateForm.get('newPassword').value,
    confirmPassword:this.updateForm.get('confirmPassword').value
  };

  if(this.updateForm.valid){
    this.appservice.post<userResponse>('US-AU',body).subscribe(y => {

    })
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
      if (this.updateForm.get('userFirstName').hasError('required')) {
        return 'You must enter a value';
      }
    case "lastName":
      if (this.updateForm.get('userLastName').hasError('required')) {
        return 'You must enter a value';
      }
    case "newPassword":
      if (this.updateForm.get('userPassword').hasError('required')) {
        return 'You must enter a value';
      } else
      if (this.updateForm.get('userPassword').hasError('minlength')){
        return this.updateForm.get('userPassword').hasError('minlength') ? 'Password too short (8 or more)' : '';
      }
    case "confirmPassword":
      if (this.updateForm.get('confirmPassword').hasError('required')) {
        return 'You must enter a value';
      } else
      if (this.updateForm.get('confirmPassword').hasError('mustMatch')){
        return this.updateForm.get('confirmPassword').hasError('mustMatch') ? 'Passwords don\'t match' : '';
      }

    }
}
}