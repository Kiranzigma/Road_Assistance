import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient} from '@angular/common/http';

interface Location{
  location: latlong;
}
interface latlong{
  lat:any;
  lng:any;
}

@Injectable()
export class AppServiceService {


  constructor(private http: HttpClient) {
  }

  geturl(path: string, param: any[]) {

    let url_map = environment.services.filter(x => x.code == path);

    let url = environment.api_url + url_map[0].url;

    param.forEach(x => {
      url = url + "/" + x;
    });

    return url;
  }

  get<T>(url: string, param?: any[]) {

    let urlparam = this.geturl(url, param);

    return this.http.get<T>(urlparam);
  }
  
  post<T>(url: string, body: any, param?:any[]){
    
    let urlparam = this.geturl(url, param);
    // generic type of response
    return this.http.post<T>(urlparam,body);
  }

  getLocation(){
    return this.http.post<Location>('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCNH7ZuXjNdXqZFzlpOB0snpBZjoUC5jRo',{
        "homeMobileCountryCode": 310,
        "considerIp": "true",
    });
  }

}
