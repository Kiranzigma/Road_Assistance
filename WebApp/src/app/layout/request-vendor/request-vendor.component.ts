import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { Imake } from 'src/app/interface/IResponse';
// https://vingenerator.org/
// https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/5XYKT3A17BG157871?format=json
@Component({
  selector: 'app-request-vendor',
  templateUrl: './request-vendor.component.html',
  styleUrls: ['./request-vendor.component.scss']
})
export class RequestVendorComponent implements OnInit {
  lat: string;
  long: string;
  icon : string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';
  constructor(private appService: AppServiceService) { }
  makes: Imake[];
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
    this.appService.getExternal<Imake>("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json").subscribe(x=>{
      this.makes = x.Results;
    });
  }

  showPosition(position) {
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
  } 

  markerClicked(marker){
    console.log(marker.company);
  }
}
