import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import jwt_decode, {JwtPayload} from 'jwt-decode';

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
   * Validate user token for expiration.
   *
   * @param {string} token
   * @return {any}
   *   Username or false
   */
  checkUser(token: string) {
    let userToken = jwt_decode<any>(token);
    if (userToken.exp && userToken.exp - Math.floor(Date.now() / 1000) > 0) {
      return userToken.Name
    } else {
      return false
    }
  }

  /**
   * Get stored data from backend
   *
   * @param {string} token Token for user-auth.
   * @return {Observable} HTTP response
   */
  fetchUserData(token: string) {
    let url = this.baseUrl + "/get-data";
    let headers = this.getAuthHeaders(token)

    let resp = this.http.get(url, {headers: headers})
      .pipe(map(resp => {
        if (!resp.hasOwnProperty('zipcodes') && !resp.hasOwnProperty('shows')) {
          return {}
        }
        return resp;
      }));
    return resp;
  }

  /**
   * Store new zip to user in storage.
   *
   * @param {string} token
   * @param {string} zip
   * @return {Observable} HTTP response.
   */
  saveUserZip(token: string, zip: string) {
    let url = this.baseUrl + "/add-zip";
    let param = new HttpParams().set('zip', zip);
    let headers = this.getAuthHeaders(token)

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
   * Delete single zip from user account in storage.
   *
   * @param {string} token
   * @param {string} zip
   */
  deleteZip(token: string, zip: string) {
    let url = this.baseUrl + "/delete-zip";
    let param = new HttpParams().set('zip', zip);
    let headers = this.getAuthHeaders(token)

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

  /**
   * Add games operation
   *
   * @param {string} token
   * @param {string} date
   * @return Observable<string>
   */
  addGames(token: string, date: string) {
    let url = environment.apiBase + '/admin/add-games' + '?date=' + date;
    let headers = this.getAuthHeaders(token)

    let resp = this.http.post(url, null, {headers: headers});
    return resp;
  }

  /**
   * Add show to user store.
   */
  addShow(token:string, showID: string) {
    let url = environment.apiBase + "/users/add-show?show=" + showID;
    let headers = this.getAuthHeaders(token)

    let resp = this.http.post(url, null, {headers: headers});
    return resp;
  }

  /**
   * Remove show from user store.
   */
  removeShow(token:string, showID: string) {
    let url = environment.apiBase + "/users/delete-show?show=" + showID;
    let headers = this.getAuthHeaders(token)

    let resp = this.http.post(url, null, {headers: headers});
    return resp;
  }

  /**
   * Build headers with auth.
   *
   * @param {string} token
   * @return {HttpHeaders}
   */
  getAuthHeaders(token: string) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append('Authorization', 'Bearer ' + token);
    return headers
  }

}
