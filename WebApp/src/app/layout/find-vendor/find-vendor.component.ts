import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { google } from 'google-maps';
import { Observable, Subscriber, Subject } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-find-vendor',
  templateUrl: './find-vendor.component.html',
  styleUrls: ['./find-vendor.component.scss']
})
export class FindVendorComponent implements OnInit, AfterViewInit {
  address: any;
  lat: string;
  long: string;
  icon : string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';
  constructor(private appService: AppServiceService) {    
  }
  ngAfterViewInit(): void {
    setTimeout(()=> {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
        this.coordinates.forEach(x=>{
          let origin = x.latitude + "," + x.longitude;
          let destination = this.lat + "," + this.long;
          this.getDistance(origin,destination).subscribe(y=> {
             y.rows.filter(z=>{
              z.elements.filter(k => {x.distance = k.distance.text; x.duration = k.duration.text});
            });
          })
        })
      }); 
    },200);
    console.log(this.coordinates)
  }
  @Output() switcher = new EventEmitter<string>();
  coordinates : any[] = [
    {
      latitude : "42.3371621"
      , longitude : "-71.1059823",
      company : 'XYZ Mech',
      distance : "",
      duration : ""
    },
    {
      latitude : "42.3391621"
      , longitude : "-71.1059825",
      company : 'ABC Mech',
      distance : "",
      duration : ""
    }
  ];

  ngOnInit(): void {    
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
    // console.log(marker.company);
  }
  getDistance(origin, destination) : Observable<any> {
    var service = new google.maps.DistanceMatrixService();
    let x = new Subject<any>();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false,
      },  function callback(response, status){
          x.next(response);
      }); 
      return x;
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
