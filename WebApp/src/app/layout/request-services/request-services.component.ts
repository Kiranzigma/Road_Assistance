import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BillingElement } from '../billing/billing.component';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { AppServiceService } from 'src/app/app-service.service';
import { Iuser } from 'src/app/interface/IResponse';

export interface HistoryDetailsElement {
  desc: string;
  position: number;
  estimatedCost: number;
}

const ELEMENT_DATA: HistoryDetailsElement[] = [];

@Component({
  selector: 'app-request-services',
  templateUrl: './request-services.component.html',
  styleUrls: ['./request-services.component.scss']
})

export class RequestServicesComponent implements OnInit {
@Input()
    title: string = "Service Details";
    btnDisabled : boolean = true
    leftBtn: string = "Back";
    arr: any;
    data: Iuser;
    form: FormGroup;
    i: number = 0;
    desc: string;
    position: number;
    estimatedCost: number;
    totalCost:number;


  displayedColumns: string[] = ['position', 'desc', 'estimatedCost'];
  dataSource = new MatTableDataSource<BillingElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserServiceService,
    private appservice: AppServiceService) {
    this.arr = this.router.getCurrentNavigation().extras.state.rowData;
    
    console.log(this.arr); 
  }


  ngOnInit(): void {
  }

}
