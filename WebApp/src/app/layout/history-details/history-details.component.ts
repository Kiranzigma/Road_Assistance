import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { AppServiceService } from 'src/app/app-service.service';
import { Iuser, IUserRequest } from 'src/app/interface/IResponse';
import { google } from 'google-maps';
import { Observable, Subscriber, Subject } from 'rxjs';
import { routerTransition } from 'src/app/shared/router-animations';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { BillingElement } from '../billing/billing.component';
import { billingData } from 'src/app/helpers/billingData';
import { MatPaginator } from '@angular/material/paginator';

export interface HistoryDetailsElement {
  desc: string;
  estimatedCost: number;
}

const ELEMENT_DATA: HistoryDetailsElement[] = [];



@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss'],
  animations: [routerTransition()]
})

export class HistoryDetailsComponent implements OnInit {
    @Input()
    title: string = "Request Details";
    btnDisabled : boolean = true
    rightBtn: string;
    leftBtn: string = "Back";
    arr: any;
    data: Iuser;
    form: FormGroup;
    lat: any;
    long: any;
    switch: boolean = false;
    address: any;
    i: number = 0;
    expan: boolean = false;
    image : [];
    imag:any;
    desc: string;
    position: number;
    estimatedCost: number;
    totalCost:number;

  

    //icon: string = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';
  

    displayedColumns: string[] = ['position', 'desc', 'estimatedCost'];
    dataSource = new MatTableDataSource<HistoryDetailsElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


    constructor(private router: Router, private fb: FormBuilder, private userService: UserServiceService,
      private appservice: AppServiceService) {
      this.arr = this.router.getCurrentNavigation().extras.state.rowData;
      let body = [];
      body.push(this.arr.user_id);
      this.appservice.get<Iuser>('US-AU', body).subscribe((res => {
        this.data = res;
        this.totalCost=this.arr.totalCost;
        this.dataSource.paginator = this.paginator;
        console.log(this.arr);
          this.form = this.fb.group({
          userid: [this.arr.user_id],
          register_no: [this.arr.register_no],
          message: [this.arr.message],
          description: [this.arr.description]
          
        });
      }))
     
      //console.log(this.data.userFirstName); 
    }
  
  
    ngOnInit() {
  
      this.rightBtn="Pay";
      if(this.arr.state=="Payment Pending"){
        this.btnDisabled=false;
      }else{
      this.btnDisabled=true;
      }

      
      this.arr.listOfServices.forEach(element => {
        element.desc;
        element.estimatedCost;
        ELEMENT_DATA.push({desc: element.desc, estimatedCost:element.estimatedCost});

      });

    

     console.log(this.totalCost);
 
    }
  

  
    // confirm() {
    //   let body = {
    //     state: "In Progress"
    //   }
    //   let ar = [];
    //   ar.push(this.arr.id);
    //   this.appservice.put<IUserRequest>('US-VEN', body, ar).subscribe((res => {
    //     alert("Request Confirmed");
    //   }))
    // }
  
    // complete() {
    //   let body = {
    //     state: "Completed"
    //   }
    //   let ar = [];
    //   ar.push(this.arr.id);
    //   this.appservice.put<IUserRequest>('US-VEN', body, ar).subscribe((res => {
    //     alert("Request Completed");
    //   }))
    // }
  
  
    // expand(x: any) {
    //   this.expan = true;
    //   this.imag = x;
    //   let modal = document.getElementById("myModal");
    //   modal.style.display = "block";
    //   window.onclick = function (event) {
    //     if (event.target == modal) {
    //       modal.style.display = "none";
    //     }
    //   }
    // }
  
    // spanClick(){
    //   let modal = document.getElementById("myModal");
    //   modal.style.display = "none";
    // }
    
    // close(){
    //   this.switch = false;
    //   if (this.arr.state === "In Progress") {
    //     this.rightBtn = "Complete Request";
    //     this.leftBtn = "Back";
    //     return;
    //   }
    //   if (this.arr.state === "Open") {
    //     this.rightBtn = "Confirm Request";
    //     this.leftBtn = "Back";
    //     return;
    //   }
    //   if (this.arr.state === "Completed") {
    //     this.rightBtn = "";
    //     this.leftBtn = "Back";
    //     return;
    //   }
    //   else{
    //     this.rightBtn = "";
    //     this.leftBtn = "Back";
    //     return;
    //   }
    // }
  
    /** Gets the total bill of everything transactions. */
 

    back() {
      this.router.navigate(['/layout/history']);
    }
  
    // generateBill(){
    //   const navigationExtras: NavigationExtras = { state: { rowData:this.arr }};
    //   this.router.navigate(['/layout/bill'], navigationExtras);
    // }
  
    outputemitted(x: string) {
      // if (this.rightBtn === "Close" && x == "right") {
      //   this.close();
      //   return;
      // }
      // if (this.rightBtn === "Confirm Request" && x == "right") {
      //   this.confirm();
      //   return;
      // }
      // if (this.rightBtn === "Complete Request" && x == "right") {
      //   this.complete();
      //   return;
      // }
      // if (this.rightBtn == "Generate Bill" && x == "right") {
      //   this.generateBill();
      //   return;
      // }
      if(this.rightBtn == "Pay" && x == "right"){
        this.pay(this.arr.totalCost);
        
      }
      if (this.leftBtn == "Back" && x == "left") {
        this.back();
        return;
      }
    }

  pay = (totalCost:any) => {
    const navigationExtras: NavigationExtras = { state: { rowData : totalCost }};
    this.router.navigate(['/layout/pay'], navigationExtras);
  }
  
    
  }
  