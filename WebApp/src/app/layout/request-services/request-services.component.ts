import { Component, OnInit, ViewChild, Input ,Output, EventEmitter} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BillingElement } from '../billing/billing.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/shared/user-service.service';
import { AppServiceService } from 'src/app/app-service.service';
import { Iuser } from 'src/app/interface/IResponse';
import { HistoryDetailsElement } from '../history-details/history-details.component';
import { routerTransition } from 'src/app/shared/router-animations';

export interface DetailsElement {
  desc: string;
  estimatedCost: number;
}

var ELEMENT_DATA: DetailsElement[] = [];

@Component({
  selector: 'app-request-services',
  templateUrl: './request-services.component.html',
  styleUrls: ['./request-services.component.scss'],
  animations: [routerTransition()]
})

export class RequestServicesComponent implements OnInit {
  @Input()
  title: string = "Service Details";
  btnDisabled: boolean = true
  leftBtn: string = "Back";
  arr: any;
  data: Iuser;
  form: FormGroup;
  i: number = 0;
  desc: string;
  position: number;
  estimatedCost: number;
  totalCost: number;

  @Input()
  pageIndex: number

  @Output()
  page: EventEmitter<PageEvent>

  displayedColumns: string[] = ['position', 'desc', 'estimatedCost'];
  dataSource = new MatTableDataSource<DetailsElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserServiceService,
    private appservice: AppServiceService) {
    this.arr = this.router.getCurrentNavigation().extras.state.rowData;
    this.totalCost = this.arr.totalCost;
    
  }


  ngOnInit() {
    this.pageIndex = 1;
    this.arr.listOfServices.forEach(element => {
      element.desc;
      element.estimatedCost;
      ELEMENT_DATA.push({ desc: element.desc, estimatedCost: element.estimatedCost });
    });
    this.dataSource.paginator = this.paginator;
    ELEMENT_DATA = [];
  }


  pageLoad(event){
    // console.log(event);
    if(event.previousPageIndex>event.pageIndex){
      this.pageIndex = event.pageIndex+1;
    }
    else{
      this.pageIndex = event.pageIndex+10;
    }
    
  }

  //method to navigate to the back page
  back() {
    this.router.navigate(['/layout/RequestDetails'], { state: { rowData: this.arr } });
  }



  // method to emit the values clicked on the button
  outputemitted(x: string) {
    if (this.leftBtn === "Back" && x == "left") {
      this.back();
      return;
    }
  }

}
