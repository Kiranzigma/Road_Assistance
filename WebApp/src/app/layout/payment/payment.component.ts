import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { AppServiceService } from 'src/app/app-service.service';
declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal',{static:true}) paypalElement: ElementRef;
  title:"Payment Portal";
  leftBtn:"Back"
  arr: any;
  planId: any;  
  subcripId: any;  
  total:any;
  basicAuth = 'Basic AV-tdAXW3xgH638gCZDrkIMImXU1YCZqmwFzlpY1UCHpdsvnxE6ElFGFosRXoL_lJSWhHc2wwtmCdkmjEJgXQmhwMdpKu2zFHi-Dx0M5iH5sJdpzwNEB0JicpK5__UTbYys2GXOx1TLcUF1SthBkPk1cCMnCYRas';  //Pass your ClientId + scret key
  
  product = {
     price: this.total,
     description: "service"
  };

 
  constructor(private router: Router,private userService: UserServiceService,
    private appservice: AppServiceService) {
    this.arr = this.router.getCurrentNavigation().extras.state.rowData;
    this.total= this.arr?.totalCost;
    }

  ngOnInit(){
    const self = this;  
    this.planId = 'P-4HX036352A911342YL2PBDHI';  //Default Plan Id
     paypal
     .Buttons({  
      createSubscription: function (data, actions) {  
        return actions.subscription.create({  
          'plan_id': self.planId,  
        });  
      },  
      onApprove: function (data, actions) {  
        //  console.log(data); 
        alert('You have successfully created subscription ' + data.subscriptionID);  
        self.getSubcriptionDetails(data.subscriptionID);  
      },  
      onCancel: function (data) {  
        // Show a cancel page, or return to cart  
        //  console.log(data);  
      },  
      onError: function (err) {  
        // Show an error page here, when an error occurs  
        //  console.log(err);  
      }  
  
    })
     .render(this.paypalElement.nativeElement);
  }

  getSubcriptionDetails(subcriptionId) {  
    const xhttp = new XMLHttpRequest();  
    xhttp.onreadystatechange = function () {  
      if (this.readyState === 4 && this.status === 200) {  
        //  console.log(JSON.parse(this.responseText));  
        alert(JSON.stringify(this.responseText));  
      }  
    };  
    xhttp.open('GET', 'https://api.sandbox.paypal.com/v1/billing/subscriptions/' + subcriptionId, true);  
    xhttp.setRequestHeader('Authorization', this.basicAuth);  
  
    xhttp.send();  
  }
  
  back(){
      this.router.navigate(['/layout/history']);
  }

  outputemitted(x: string) {
    if (this.leftBtn === "Back" && x == "left") {
      this.back();
      return;
    }

}
}