import { Component, OnInit, AfterViewInit, Inject, EventEmitter, Output } from '@angular/core';
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
import { userResponse } from 'src/app/interface/IResponse';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {routerTransition} from '../../shared/router-animations';
import { google } from 'google-maps';
import { Observable, Subscriber, Subject } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routerTransition()]
})
export class ProfileComponent implements OnInit{
  
  btnDisabled : boolean = true;
  url = '';
  userImage:'';
  title : string = "Update Profile";
  switch: boolean = false;
  rightBtn : string = "Update";
  leftBtn : string = "";
  updateForm : FormGroup;
  user : Iuser;

  
  address: any;
  lat: any;
  long: any;
  icon: string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';
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
    private EncrDecr: EncryptServiceService,
    private appService: AppServiceService) {
      
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
        userImage : ['']       
      }, {
        validator: MustMatch('newPassword','confirmPassword')
        });
        
        // if(this.userService.getUser().vendorLatitude != null && this.userService.getUser().vendorLongitude != null){
        //   this.lat = this.userService.getUser().vendorLatitude ;
        //   this.long = this.userService.getUser().vendorLongitude ;
        //   this.appService.getExternal("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.long + "&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
        //     x => {
        //       x.results.slice(0, 1).forEach(y => this.address = y);
        //       this.address = this.address.formatted_address;
        //     }
        //   );
        // }
        
    }
    
    public selectedFile:any;
    public blobUrl;
    
  
  ngOnInit():void{
      
      //this.blobUrl = window.URL.createObjectURL(this.userImage);
      
      if (this.userService.getUser().userType === "vendor"){
        this.rightBtn = "Add Address";
        this.btnDisabled = false;      
      }
      

      this.blobUrl=this.user.userImage;
      console.log(this.lat);
      console.log(this.long);

  }
 
 

  get rf() { return this.updateForm.controls; }

  onSelectFile(event) {
   // this.selectedFile= event.target.files[0];
   this.btnDisabled=false;
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

  onClick(event){
    this.btnDisabled=false;
  }

  public delete(){
    this.blobUrl = null;
  }

  addAddress(){
    this.switch = true;
    this.rightBtn = "Submit";
    this.leftBtn = "Back";

    if(this.userService.getUser().vendorLatitude === null && this.userService.getUser().vendorLongitude === null){
      navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
    }else{
      this.lat = parseFloat(this.user.vendorLatitude) ;
      this.long = parseFloat(this.user.vendorLongitude) ;
      this.appService.getExternal("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.long + "&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
      x => {
        x.results.slice(0, 1).forEach(y => this.address = y);
        this.address = this.address.formatted_address;
      }
    );
    }

  }

  back(){
    this.switch = false;
    this.leftBtn ="";
    this.rightBtn = "Add Address";
  }

  updateUser(){
    let body = {
      userFirstName: this.updateForm.get('firstName').value,
      userLastName: this.updateForm.get('lastName').value,
      userGender: this.updateForm.get('gender').value,
      userMobileNumber: this.updateForm.get('mobile').value,
      userPassword:this.updateForm.get('newPassword').value ? this.EncrDecr.set('123456$#@$^@1ERF',this.updateForm.get('newPassword').value) : this.userService.getUser().userPassword ,
      userImage: this.blobUrl,
      vendorLatitude:this.lat,
      vendorLongitude:this.long
    };
    
    if(this.updateForm.valid){
      let arr=[];
      arr.push(this.user.id);
      this.appservice.put<Iuser>('US-AU',body,arr).subscribe(y=> {
        this.userService.reloadUser(y);
        console.log(body)
        alert('Details have been updated successfully');
        this.btnDisabled=true;
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


outputemitted(x: string){
  if(this.rightBtn == "Submit" && x == "right"){
    this.updateUser();
   }
  if(this.rightBtn == "Update" && x=="right"){
    this.updateUser();
  }
  if(this.rightBtn == "Add Address" && x =="right"){
    this.addAddress();
  }
  if(this.leftBtn== "Back" && x == "left"){
    this.back();
  }
 
}

emit() {
  this.switcher.emit();
}

@Output() switcher = new EventEmitter<string>();
  showPosition(position) {
    
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
    this.appService.getExternal("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.long + "&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
      x => {
        x.results.slice(0, 1).forEach(y => this.address = y);
        this.address = this.address.formatted_address;
      }
    );
  }


  getLatLong() {
    this.appService.getExternal("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address + "&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
      x => {
        x.results.slice(0, 1).forEach(y => {
          this.lat = y.geometry.location.lat;
          this.long = y.geometry.location.lng;
          console.log(this.lat)
        });
      }
    )
  }

  outputemit(x:any){
    this.lat= x.lat;
    this.long= x.long;
  }

}