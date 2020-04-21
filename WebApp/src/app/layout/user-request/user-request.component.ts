import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { IUserRequest, Iuser } from '../../interface/IResponse';
import { AppServiceService } from 'src/app/app-service.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { routerTransition } from 'src/app/shared/router-animations';
import { Router, NavigationExtras } from '@angular/router';
import { UserServiceService } from 'src/app/shared/user-service.service';



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
  user : Iuser;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   
  ngOnInit() {
    let body= [];
    let type = "vendor";
    body.push(this.user.id);
    body.push(type);
    this.appservice.get<IUserRequest>('US-VEN',body).subscribe((res: any[])=>{
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;  
      this.data.reverse();
      this.dataSource.sort = this.sort;  
      //  console.log(this.data);
      
    })  
  }
  constructor(private appservice: AppServiceService,private router: Router, private userService: UserServiceService ) {
    this.user = this.userService.getUser();
  }


  redirectToDetails = (element:object) => {
    const navigationExtras: NavigationExtras = { state: { rowData : element }};
    this.router.navigate(['/layout/RequestDetailsComponent'], navigationExtras);
      }
}