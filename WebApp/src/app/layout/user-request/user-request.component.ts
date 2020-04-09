import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { IUserRequest } from '../../interface/IResponse';
import { AppServiceService } from 'src/app/app-service.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})

export class UserRequestComponent implements OnInit {

  displayedColumns: string[] = ['created', 'state', 'id', 'description', 'details'];
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