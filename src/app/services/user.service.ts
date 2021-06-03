import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

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
  fetchUserZips(username: string, t: string) {
    let url = this.baseUrl + "/get-zip";
    let param = new HttpParams().set('username', username);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + t);
    let resp = this.http.get(url, {headers: headers, params: param})
      .pipe(map(resp => {
        if (resp['zipcodes']) {
          return resp['zipcodes'];
        } else {
          return [];
        }
      }));
    return resp;
  }

  /**
   * Store new zip to user in storage.
   *
   * @param {string} username
   * @param {string} token
   * @param {string} zip
   */
  saveUserZip(username: string, t: string, zip: string) {
    let url = this.baseUrl + "/add-zip";
    let param = new HttpParams().set('username', username);
    param = param.append('zip', zip);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + t);

    let resp = this.http.post(url, '', {headers: headers, params: param})
      .pipe(map(resp => {
        if (resp['zipcodes']) {
          return resp['zipcodes'];
        } else {
          return [];
        }
      }));
    return resp;
  }

  /**
   * Create new user in storage
   *
   * @param {string} username
   * @param {string} password
   */
  createUser(username: string, password: string) {
    let url = this.baseUrl + '/create';
    let body = {username: username, password: password}
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    let resp = this.http.post(url, body, {headers: headers});
    return resp;
  }

  /**
   * Login user
   *
   * @param {string} username
   * @param {string} password
   * @param Observable<string>
   */
  loginUser(username: string, password: string) {
    let url = this.baseUrl + '/token';
    let headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ":" + password)
    });

    let resp = this.http.get(url, {responseType: 'text', headers: headers});
    return resp;
  }

  /**
   * Revoke token on backend
   *
   * @param {string} token
   * @return Observable<string>
   */
  logoutUser(token: string) {
    let url = this.baseUrl + '/revoke';
    let body = {token: token};
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    let resp = this.http.post(url, body, {headers: headers});
    return resp;
  }

}
