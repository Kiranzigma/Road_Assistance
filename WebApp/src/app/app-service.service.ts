import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
@Injectable()
export class AppServiceService {


  constructor(private http: HttpClient) {
  }

  geturl(path: string, param: any[]) {

    let url_map = environment.services.filter(x => x.code == path);

    let url = environment.api_url + url_map[0].url;

    if(param) {
    param.forEach(x => {
      url = url + "/" + x;
    });
    }
    return url;
  }

  get<T>(url: string, param?: any[]) : Observable<any> {

    let urlparam = this.geturl(url, param);

    return this.http.get<T>(urlparam);
  }
  
  post<T>(url: string, body: any, param?:any[]) : Observable<any>{
    
    let urlparam = this.geturl(url, param);
    // generic type of response
    return this.http.post<T>(urlparam,body);
  }

  getExternal<T>(url): Observable<any>{
    return this.http.get(url);
  }
}
