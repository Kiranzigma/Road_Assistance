import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name = 'Angular 9';
  url = '';
  title : string = "Update Profile";

  constructor(private http: HttpClient) { 
   
  }
  updateForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    email : new FormControl(''),
    mobile : new FormControl(''),
    gender : new FormControl(''),
    password : new FormControl(''),
    newPassword : new FormControl(''),
    confirmPassword : new FormControl('')
    
  });
  ngOnInit(): void {}

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
}


