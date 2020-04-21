import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { AppServiceService } from 'src/app/app-service.service';
import { Iuser, IUserRequest } from 'src/app/interface/IResponse';
import { google } from 'google-maps';
import { Observable, Subscriber, Subject } from 'rxjs';
import { routerTransition } from 'src/app/shared/router-animations';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
declare var google: any;


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  animations: [routerTransition()]
})
export class RequestDetailsComponent implements OnInit {
  @Input()
  title: string = "Request Details";
  rightBtn: string;
  leftBtn: string = "Back";
  arr: any;
  data: Iuser;
  form: FormGroup;
  lat: any;
  long: any;
  switch: boolean = false;
  address: any;
  expan: boolean = false;
  image : [];
  imag:any;
  icon: string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';


  constructor(private router: Router, private fb: FormBuilder, private userService: UserServiceService,
    private appservice: AppServiceService) {
    this.arr = this.router.getCurrentNavigation().extras.state.rowData;
    let body = [];
    body.push(this.arr.user_id);
    this.appservice.get<Iuser>('US-AU', body).subscribe((res => {
      this.data = res;
        this.form = this.fb.group({
        latitude: [this.arr.latitude],
        longitude: [this.arr.longitude],
        state: [this.arr.state],
        userid: [this.arr.user_id],
        firstName: [this.data.userFirstName],
        lastName: [this.data.userLastName],
        mobile: [this.data.userMobileNumber],
        vin: [this.arr.vin],
        register_no: [this.arr.register_no],
        message: [this.arr.message],
        description: [this.arr.description],
        name: [this.data.userFirstName + ' ' + this.data.userLastName],
        time: [this.arr.estimated_time],
        image:[this.arr.image]
      });
    }))
    
    //console.log(this.data.userFirstName); 
  }
  rowImages : any = [];

  ngOnInit() {

    if (this.arr.state === "In Progress") {
      this.rightBtn = "Complete Request";
    }
    if (this.arr.state === "Open") {
      this.rightBtn = "Confirm Request";
    }
    if (this.arr.state === "Completed") {
      this.rightBtn = "Generate Bill";
    }

    this.image = this.arr.image;
    let rows = Math.floor((this.image.length / 3));
    let remainder = this.image.length % 3;
    if(remainder > 0){
      rows = rows + 1;
    }
    let k = 0;
    for(let i = 1; i <= rows; i++){
      let data = [];
      for(let j =1; j<= 3; j++){
        let col = {
          image : this.image[k]
        }
        data.push(col)
        k++;
      }
      this.rowImages.push(data);
    }

    this.lat = parseFloat(this.arr.latitude);
    this.long = parseFloat(this.arr.longitude);
    this.addresspoint();
  }

  addresspoint() {
    this.appservice.getExternal("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.long + "&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
    x => {
      x.results.slice(0, 1).forEach(y => this.address = y);
      this.address = this.address.formatted_address;
    }
  );
  }

  confirm() {
    let body = {
      state: "In Progress"
    }
    let ar = [];
    ar.push(this.arr.id);
    this.appservice.put<IUserRequest>('US-VEN', body, ar).subscribe((res => {
      alert("Request Confirmed");   
      this.rightBtn="Complete Request";   
 

    }))
  }

  complete() {
    let body = {
      state: "Completed"
    }
    let ar = [];
    ar.push(this.arr.id);
    this.appservice.put<IUserRequest>('US-VEN', body, ar).subscribe((res => {
      alert("Request Completed");
      this.rightBtn="Generate Bill";   

    }))
  }

  getImages(){

    if(this.image.length == 0){
      this.switch = false;
      alert("No pictures to display");
      return;
    }
    else{
      this.switch = true;
      this.rightBtn = "Close";
      this.leftBtn = "";
      return;
    }
  }

  expand(x: any) {
    this.expan = true;
    this.imag = x;
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  spanClick(){
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  
  close(){
    this.switch = false;
    if (this.arr.state === "In Progress") {
      this.rightBtn = "Complete Request";
      this.leftBtn = "Back";
      return;
    }
    if (this.arr.state === "Open") {
      this.rightBtn = "Confirm Request";
      this.leftBtn = "Back";
      return;
    }
    if (this.arr.state === "Completed") {
      this.rightBtn = "Generate Bill";
      this.leftBtn = "Back";
      return;
    }
    else{
      this.rightBtn = "";
      this.leftBtn = "Back";
      return;
    }
  }

  back() {
    this.router.navigate(['/layout/UserRequestComponent']);
  }

  generateBill = (result:any) => {
    const navigationExtras: NavigationExtras = { state: { rowData : result}};
    this.router.navigate(['/layout/bill'], navigationExtras);
  }

  

  outputemitted(x: string) {
    if (this.rightBtn === "Close" && x == "right") {
      this.close();
      return;
    }
    if (this.rightBtn === "Confirm Request" && x == "right") {
      this.confirm();
      return;
    }
    if (this.rightBtn === "Complete Request" && x == "right") {
      this.complete();
      return;
    }
    if (this.rightBtn == "Generate Bill" && x == "right") {
      this.generateBill(this.arr);
      return;
    }
    if (this.leftBtn == "Back" && x == "left") {
      this.back();
      return;
    }
  }

  
}
