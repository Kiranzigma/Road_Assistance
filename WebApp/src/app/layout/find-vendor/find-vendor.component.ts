import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-vendor',
  templateUrl: './find-vendor.component.html',
  styleUrls: ['./find-vendor.component.scss']
})
export class FindVendorComponent implements OnInit {
  lat: string;
  long: string;
  icon : string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';
  constructor() { }
  coordinates :any[];

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
    this.coordinates = [
      {
        latitude : "42.3371621"
        , longitude : "-71.1059823",
        company : 'XYZ Mech'
      }
    ]
  }
  showPosition(position) {
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
  } 

  markerClicked(marker){
    console.log(marker.company);
  }
}
