import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { IUserRequest } from '../../interface/IResponse';
import { AppServiceService } from 'src/app/app-service.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})

export class UserRequestComponent implements OnInit,AfterViewInit {
  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['created', 'state', 'number', 'title', 'details'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: IUserRequest[] = [];

  constructor(private _httpClient: HttpClient, private appservice: AppServiceService,) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resultsLength = 0;
  isLoadingResults : boolean = true;
  isRateLimitReached = false;

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient,this.appservice);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRequest(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(x => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = x.total_count;

          return x.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(x => this.data = x);
  }
  public redirectToDetails = (id: string) => {
    
  }
  }

  export interface api {
    items: IUserRequest[];
    total_count: number;
  }
  

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  data: IUserRequest;
  constructor(private http: HttpClient, private appservice: AppServiceService,) {}

  getRequest(sort: string, order: string, page: number):Observable<api>{
    let t;
    this.http.get<IUserRequest>('US-VEN').subscribe(x=>{
      t = x;
    });
    return t;
}



}