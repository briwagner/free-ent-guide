import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataSvcService {

  private url = 'http://website.com/winestop/diggings';

  constructor(private http: Http) { }

  getHeroes() {
    let heroes = this.http.get(this.url, {headers: this.getHeaders()})
                            .map(this.handleResponse);
    return heroes;
  }

  getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  handleResponse(response: Response) {
    console.log(response);
    return response.json().data;
  }
}
