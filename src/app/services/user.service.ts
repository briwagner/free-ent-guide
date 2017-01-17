import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  // userObs: Observable<string>;
  userZipSubject = new BehaviorSubject<string>('');
  userZip$ = this.userZipSubject.asObservable();

  constructor() {
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

}
