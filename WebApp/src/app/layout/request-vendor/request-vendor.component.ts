import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import {routerTransition} from '../../shared/router-animations'
// https://vingenerator.org/
// https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/5XYKT3A17BG157871?format=json
@Component({
  selector: 'app-request-vendor',
  templateUrl: './request-vendor.component.html',
  styleUrls: ['./request-vendor.component.scss'],
  animations: [routerTransition()]
})
export class RequestVendorComponent implements OnInit {
  title : string = "Request Mechanic"
  btndisabled : boolean = true;
  vinData : any[];
  switch : boolean = false;
  rightBtn : string = "Find Mechanic";
  leftBtn : string = "";
  constructor(private appService: AppServiceService) { }
  switcher : any;
  requestForm = new FormGroup({
    vehicleNumber: new FormControl(''),
    vehicleRegNumber: new FormControl(''),
    description : new FormControl(''),
    message : new FormControl('')
  });

  ngOnInit(): void {   
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
  findMechanic(){
    this.switch = true;
    this.rightBtn = "Submit Request";
    this.leftBtn = "Back";
  }
  back(){
    this.switch = false;
    this.leftBtn ="";
    this.rightBtn = "Find Mechanic";
  }
  outputemit(x : string){
    this.back();
  }
  outputemitted(x: string){
    if(this.rightBtn == "Find Mechanic" && x == "right"){
      this.findMechanic();
    }
    if(this.leftBtn == "Back" && x == "left"){
      this.back();
    }
    if(this.rightBtn == "Submit Request" && x == "right"){
      
    }
  }
}
