import { Component, OnInit, AfterViewInit, Output, EventEmitter, AfterContentInit, Input, SimpleChanges } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { google } from 'google-maps';
import { Observable, Subscriber, Subject } from 'rxjs';
import { Iuser } from 'src/app/interface/IResponse';
declare var google: any;

@Component({
  selector: 'app-find-vendor',
  templateUrl: './find-vendor.component.html',
  styleUrls: ['./find-vendor.component.scss']
})
export class FindVendorComponent {
  @Input()
  vinData : any;
  address: any;
  lat: string;
  long: string;
  vendorId : String;
  icon: string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';
  constructor(private appService: AppServiceService) {
    let params = [];
    params.push("vendor")
    this.appService.get<Iuser>('US-UT',params).subscribe(x=>{
      this.coordinates = x;
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
        this.getCordinateDistance();
      });
    })
  }
  coordinates: Iuser[];
  getCordinateDistance(){
    this.coordinates.forEach(x => {
      let origin = x.vendorLatitude + "," + x.vendorLongitude;
      let destination = this.lat + "," + this.long;
      this.getDistance(origin, destination).subscribe(y => {
        y.rows.filter(z => {
          z.elements.filter(k => { 
            x.distance = k.distance?.text;
            x.numDistance = k.distance?.text.replace(',','.').replace(/[^0-9\.]+/g,"");
            x.duration = k.duration?.text;
             });
        });
      })
    });
    this.coordinates.sort((a,b)=> (a.numDistance > b.numDistance) ? 1 : (b.numDistance > a.numDistance)? -1 : 0 );
    this.coordinates = this.coordinates.slice(0,1);
    this.coordinates.forEach(x => {
      this.vendorId = x.id;
      this.emit();
    });
  }
  @Output() switcher = new EventEmitter<any>();
  showPosition(position) {
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
    this.emit();
    this.appService.getExternal("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.lat + "," + this.long + "&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
      x => {
        x.results.slice(0, 1).forEach(y => this.address = y);
        this.address = this.address.formatted_address;
      }
    );
  }

  markerClicked(marker) {
    console.log(marker.company);
  }
  getDistance(origin, destination): Observable<any> {
    let x = new Subject<any>();
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false,
      }, function callback(response, status) {
        x.next(response);
      });
    return x;
  }

  emit() {
    let loc = {
      "lat" : this.lat,
      "long" : this.long,
      "vendorId": this.vendorId
    }
    this.switcher.emit(loc);
  }
  getLatLong() {
    this.appService.getExternal("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address + "&key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo").subscribe(
      x => {
        x.results.slice(0, 1).forEach(y => {
          this.lat = y.geometry.location.lat;
          this.long = y.geometry.location.lng;
          this.emit();
        });
        this.getCordinateDistance();
      }
    )
  }
}
