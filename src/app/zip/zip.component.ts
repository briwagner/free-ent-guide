import { Component, OnInit, Input } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css'],
})
export class ZipComponent implements OnInit {

  zipCode;

  constructor(private userservice: UserService) {
    this.userservice.userZip$.subscribe(newVal =>  this.zipCode = newVal);
  }

  ngOnInit() {
    // Check params for zip code and use if present.
    // REgex to remove leading '?' character.
    let ppp = new URLSearchParams(location.search);
    // console.log(ppp.paramsMap);
    if (location.search.includes('zip')) {
      this.getQuery();
    } else {
      // Check localStorage for zip code and use.
      if (localStorage.getItem('zipCode')) {
        this.storeZip(localStorage.getItem('zipCode'));
      }
    }
  }

  /**
   * What does this do??
   */
  getQuery() {
    let params = new URLSearchParams(location.search);
    // regex to find this ...?
    // this.zipCode = params.get('zip');
    // console.log({zip: this.zipCode});
    this.userservice.storeZip(params.get('zip'));
  }

  storeZip(data) {
    localStorage.setItem('zipCode', data);
    window.history.pushState({}, 'Movies in ' + data, window.location.pathname + "?zip=" + data);
    this.zipCode = data;
    this.userservice.storeZip(data);
  }

  clearZip() {
    localStorage.removeItem('zipCode');
    window.history.pushState({}, 'Movies', window.location.pathname);
    this.userservice.storeZip('');
  }

  validZip() {
    let systemZip = this.userservice.userZipSubject.getValue();
    if (systemZip != undefined) {
      if (systemZip.toString().length == 5) {
        return true;
      }
    }
    return false;
  }

}
