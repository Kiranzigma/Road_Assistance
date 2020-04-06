import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-find-vendor',
  templateUrl: './find-vendor.component.html',
  styleUrls: ['./find-vendor.component.scss']
})
export class FindVendorComponent implements OnInit {
  address: any;
  lat: string;
  long: string;
  icon : string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';
  constructor(private appService: AppServiceService) { }
  coordinates :any[];
  @Output() switcher = new EventEmitter<string>();

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
    this.appService.getExternal("https://maps.googleapis.com/maps/api/geocode/json?latlng="+ this.lat +","+this.long +"&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
      x=>{
        x.results.slice(0,1).forEach(y=> this.address = y);
        this.address = this.address.formatted_address;
      }
    );
  } 

  markerClicked(marker){
    console.log(marker.company);
  }
  emit(){
    this.switcher.emit();
  }
  getLatLong(){
    this.appService.getExternal("https://maps.googleapis.com/maps/api/geocode/json?address="+ this.address + "&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
      x=>{
        x.results.slice(0,1).forEach(y=> {
          this.lat = y.geometry.location.lat;
          this.long = y.geometry.location.lng;
        });
      }
    )
  }
}
