import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validator, AbstractControl, Validators, FormControl } from '@angular/forms';
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
import {routerTransition} from '../../shared/router-animations';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routerTransition()]
})
export class ProfileComponent implements OnInit{
  btnDisabled : boolean = false;
  url = '';
  userImage:'';

  title : string = "Update Profile";
  
  switch: boolean = false;
  
  rightBtn : string = "Update";

  updateForm : FormGroup;
  user : Iuser;
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
    private EncrDecr: EncryptServiceService) {
      this.user = this.userService.getUser();
      this.updateForm = this.fb.group({
        firstName : [this.user.userFirstName,[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
        lastName : [this.user.userLastName,[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
        email : [this.user.userEmail],
        mobile : [this.user.userMobileNumber,[Validators.minLength(10),Validators.maxLength(10)]],
        gender : [this.user.userGender],
        password : [this.user.userPassword],
        newPassword : ['', [Validators.minLength(6)]],
        confirmPassword : ['',[Validators.minLength(6)]],
        userImage : [this.user.userImage]
      }, {
        validator: MustMatch('newPassword','confirmPassword')
        });
        
    }

    public selectedFile:any;
    public blobUrl;
    
  
  ngOnInit():void{

      //this.blobUrl = window.URL.createObjectURL(this.userImage);
      console.log(this.user.userImage)
      if (this.userService.getUser().userType === "vendor"){
        this.rightBtn = "Add Address";
      }
      if(this.user.userImage===null){

      }

      this.blobUrl=this.user.userImage;
  }
 


  get rf() { return this.updateForm.controls; }

  onSelectFile(event) {
   // this.selectedFile= event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
  
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.blobUrl=reader.result as string; 
        // console.log(window.URL)
        // let bloburl = window.URL.createObjectURL(this.url);
        // console.log(bloburl);     
      }
    }
  }

  public delete(){
    this.blobUrl = null;
  }

  updateUser(){
    let body = {
      userFirstName: this.updateForm.get('firstName').value,
      userLastName: this.updateForm.get('lastName').value,
      userGender: this.updateForm.get('gender').value,
      userMobileNumber: this.updateForm.get('mobile').value,
      userPassword:this.updateForm.get('newPassword').value ? this.EncrDecr.set('123456$#@$^@1ERF',this.updateForm.get('newPassword').value) : this.userService.getUser().userPassword ,
      userImage: this.blobUrl
    };
    
  
    if(this.updateForm.valid){
      let arr=[];
      arr.push(this.user.id);
      this.appservice.put<Iuser>('US-AU',body,arr).subscribe(y=> {
        this.userService.reloadUser(y);
        console.log(body)
        alert('Details have been updated successfully');
      });
    }
  }


// updateUser(){
//   let body = {
//     userFirstName: this.updateForm.get('firstName').value,
//     userLastName: this.updateForm.get('lastName').value,
//     userGender: this.updateForm.get('gender').value,
//     userMobileNumber: this.updateForm.get('mobile').value,
//     userPassword:this.updateForm.get('newPassword').value ? this.EncrDecr.set('123456$#@$^@1ERF',this.updateForm.get('newPassword').value) : this.userService.getUser().userPassword, 
//     //userImage:this.selectedFile
//   };
  

//   if(this.updateForm.valid){
//     let arr=[];
//     arr.push(this.user.id);
//     //const uploadData = new FormData();
  
//     this.appservice.put<Iuser>('US-AU',body,arr).subscribe(y=> {

//       this.userService.reloadUser(y);
//       alert('Details have been updated successfully');
//     });

//   }
//}

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
outputemitted(){
  if(this.rightBtn == "Update"){
    this.updateUser();
  }
  if(this.rightBtn == "Add Address"){
    console.log("Switch to Add Address page");
  }
}
}