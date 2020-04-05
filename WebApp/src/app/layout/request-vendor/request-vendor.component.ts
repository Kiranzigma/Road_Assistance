import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { Imake } from 'src/app/interface/IResponse';
import { FormGroup, FormControl } from '@angular/forms';

// https://vingenerator.org/
// https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/5XYKT3A17BG157871?format=json
@Component({
  selector: 'app-request-vendor',
  templateUrl: './request-vendor.component.html',
  styleUrls: ['./request-vendor.component.scss']
})
export class RequestVendorComponent implements OnInit {
  btndisabled : boolean = true;
  vinData : any[];
  lat: string;
  long: string;
  icon : string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';
  constructor(private appService: AppServiceService) { }
  makes: Imake[];
  coordinates :any[];

  requestForm = new FormGroup({
    vehicleNumber: new FormControl(''),
    vehicleRegNumber: new FormControl(''),
    description : new FormControl(''),
    message : new FormControl('')
  });

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
    // this.appService.getExternal<Imake>("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json").subscribe(x=>{
    //   this.makes = x.Results;
    // });
  }

  showPosition(position) {
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
  } 

  markerClicked(marker){
    console.log(marker.company);
  }
  checkInput(){
    let vin = this.requestForm?.get('vehicleNumber')?.value;
    if(vin?.length == 17){
      this.appService.getExternal("https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/" + vin +"?format=json").subscribe(
         x=>{
          this.vinData = x.Results.filter(y=> {
            if((y.Variable == "Make" ||y.Variable == "Manufacturer Name"|| y.Variable == "Model"  ||y.Variable == "Engine Model") && y.Value != null) {
              return y;
            }
          })
          if(this.vinData.length > 1){
            this.btndisabled = false;
          }
         }          
      );
    }else{
      this.btndisabled = true;
    }
  }
}
