import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import { IUserRequest, Iuser } from '../../interface/IResponse';
import { AppServiceService } from 'src/app/app-service.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { routerTransition } from 'src/app/shared/router-animations';
import { Router, NavigationExtras } from '@angular/router';
import { UserServiceService } from 'src/app/shared/user-service.service';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [routerTransition()]
})
export class HistoryComponent implements OnInit {


  constructor(private userService: UserServiceService ,private appservice: AppServiceService,private router: Router ) {
    this.user = this.userService.getUser();
  }

  title : string = "History";
  displayedColumns: string[] = ['id','created','description','state','details'];
  data: IUserRequest[] = [];
  dataSource: MatTableDataSource<IUserRequest>;
  user:Iuser;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  ngOnInit(){
    let body = [];
    body.push(this.user.id);
    this.appservice.get<IUserRequest>('US-VEN',body).subscribe((res: any[])=>{
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      //this.sort.sort({ id: 'created', start: 'desc', disableClear: false });  
      this.dataSource.sort = this.sort;
      //this.sort.sort(({id: 'created',start:'desc'}) as MatSortable);
      //this.sort.sortChange=this.data
      console.log(this.data);
      this.data.reverse();
    }) 
  }

  redirectToDetails = (element:object) => {
    const navigationExtras: NavigationExtras = { state: { rowData:element }};
    this.router.navigate(['/layout/HistoryDetailsComponent'], navigationExtras);
      }

}

