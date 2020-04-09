import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { IUserRequest } from '../../interface/IResponse';
import { AppServiceService } from 'src/app/app-service.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { routerTransition } from 'src/app/shared/router-animations';



@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss'],
  animations: [routerTransition()]
})

export class UserRequestComponent implements OnInit {
  title : string = "Request Tracker";
  displayedColumns: string[] = ['id', 'created', 'description', 'state', 'details'];
  data: IUserRequest[] = [];
  dataSource: MatTableDataSource<IUserRequest>;  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.appservice.get<IUserRequest>('US-VEN').subscribe((res: any[])=>{
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;  
      this.dataSource.sort = this.sort;  
      console.log(this.data);
    })  
  }
  constructor(private appservice: AppServiceService) {
  
  }


  public redirectToDetails = (id: string) => {
    
  }
}