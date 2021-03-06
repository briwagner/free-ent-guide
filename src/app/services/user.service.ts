import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams} from '@angular/common/http';

import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private baseUrl = environment.apiBase + "/users"

  // userObs: Observable<string>;
  userZipSubject = new BehaviorSubject<string>('');
  userZip$ = this.userZipSubject.asObservable();

  constructor(private http: HttpClient) {
    // this.userZipSubject = new Subject();
    // this.userObs = this.userZipSubject.asObservable();
    // this.userZipSubject.next('75');
   }

  storeZip(newValue) {
    this.userZipSubject.next(newValue);
  }

  returnZip() {
    return this.userZipSubject;
  }

  /**
   * Get stored zips from backend
   *
   * @param {string} username
   * @return {Array}
   */
  fetchUserZips(username) {
    let url = this.baseUrl + "/get-zip";
    let param = new HttpParams().set('username', username);
    let resp = this.http.get(url, {params: param})
      .pipe(map(resp => {
        if (resp['zipcodes']) {
          return resp['zipcodes'];
        } else {
          return [];
        }
      }));
    return resp;
  }

}
