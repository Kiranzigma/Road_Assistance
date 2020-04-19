import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { Router, NavigationExtras } from '@angular/router';
import { routerTransition } from 'src/app/shared/router-animations';
import { billingData } from '../../helpers/billingData';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatCheckboxChange} from '@angular/material/checkbox';


export interface BillingElement {
  desc: string;
  position: number;
  estimatedCost: number;
}

const ELEMENT_DATA: BillingElement[] = [];
let FINAL_BILL: BillingElement[] = [];


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  animations: [routerTransition()]
})

export class BillingComponent implements OnInit {

  @Input()
  title: string = "Billing Service";
  leftBtn: string = "Back";
  arr: any;
  i: number = 0;
  rightBtn: string = "Checkout";

  displayedColumns: string[] = ['position', 'desc', 'estimatedCost','select'];
  footerColumns: string[] = ['desc', 'estimatedCost'];
  dataSource = new MatTableDataSource<BillingElement>(ELEMENT_DATA);
  finalBill = new MatTableDataSource<BillingElement>(FINAL_BILL);
  selection = new SelectionModel<BillingElement>(true, []);
  
  constructor(private router: Router) { 
  this.arr = this.router.getCurrentNavigation().extras.state.rowData;

  }

  ngOnInit(): void {
    billingData.data.forEach(e => {
      ELEMENT_DATA.push({position: ++this.i, desc: e.desc, estimatedCost: e.repair.total_cost});
    })
    // console.log(this.dataSource);
    // console.log(this.getTotalCost());
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(x:String) {
    this.isAllSelected() ? this.selection.clear():this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isSomeSelected(x:MatCheckboxChange,row?: BillingElement) {
    
    this.selection.toggle(row)
    // console.log(x.checked);
    // console.log(this.selection);
    // console.log(row);
    // const checkDuplicate = obj => obj.position === row.position;
    if(x.checked===true){
      FINAL_BILL.push(row);
    }
    if(x.checked==false){
      FINAL_BILL.splice(FINAL_BILL.findIndex(v => v.position === row.position), 1);
    }
    
    console.log(this.finalBill.filteredData);
    console.log("Total Cost = " + this.getTotalCost());
    

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: BillingElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /** Gets the total bill of everything transactions. */
  getTotalCost() {
    return this.finalBill.filteredData.map(t => t.estimatedCost).reduce((acc, value) => acc + value, 0);
  }

  back() {
    FINAL_BILL = [];
    this.router.navigate(['/layout/RequestDetailsComponent'], { state: { rowData:this.arr }});
  }

  outputemitted(x: string) {
    if (this.leftBtn == "Back" && x == "left") {
      this.back();
      return;
    }
  }
}
