import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-vendor',
  templateUrl: './request-vendor.component.html',
  styleUrls: ['./request-vendor.component.scss']
})
export class RequestVendorComponent implements OnInit {
  lat: string;
  long: string;
  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
  }

  showPosition(position) {
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
    console.log(this.lat);
    console.log(this.long);
  } 
}
