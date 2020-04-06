import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  title : string = "Update Profile"
  constructor(private _routes: Router) { }

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
  ngOnInit(): void {
   
  }

}
