import { Component, OnInit, Input } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
})
export class ZipComponent implements OnInit {

  zipCode;
  hasZip: boolean = false;
  formError: boolean = false;

  constructor(private userservice: UserService) {
    this.userservice.userZip$.subscribe(newVal =>  this.zipCode = newVal);
  }

  ngOnInit() {
    // Check localStorage for zip code and use.
    if (localStorage.getItem('zipCode')) {
      this.storeZip(localStorage.getItem('zipCode'));
    } else if (location.search.includes('zip')) {
      let params =  new URLSearchParams(location.search.substring(1));
      this.storeZip(params.get("zip"))
    }
  }

  storeZip(data) {
    if (this.validZip(data)) {
      localStorage.setItem('zipCode', data);
      window.history.pushState({}, 'Movies in ' + data, window.location.pathname + "?zip=" + data);
      this.zipCode = data;
      this.userservice.storeZip(data);
      this.hasZip = true;
      this.formError = false;
    } else {
      this.formError = true;
    }
  }

  clearZip() {
    localStorage.removeItem('zipCode');
    window.history.pushState({}, 'Movies', window.location.pathname);
    this.userservice.storeZip('');
    this.hasZip = false;
  }

  validZip(zip: number) {
    if (zip != undefined) {
      if (zip.toString().length == 5) {
        return true;
      }
    }
    return false;
  }

}
