import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(private _routes: Router,
    private route: ActivatedRoute) { }

  updateForm = new FormGroup({
    $key: new FormControl(null),
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
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('auth');
  }

}