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
  username: string;
  userZips: Array<string>;
  flash: string;

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

  /**
   * Copy user input from form field into app, browser storage.
   * @param data
   */
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

  /**
   * Reset form field.
   */
  clearZip() {
    localStorage.removeItem('zipCode');
    window.history.pushState({}, 'Movies', window.location.pathname);
    this.userservice.storeZip('');
    this.hasZip = false;
  }

  /**
   * Swap active swap from inactive list.
   * @param {string} zip
   */
  swapZip(zip: string) {
    this.clearZip();
    this.storeZip(zip);
  }

  /**
   * Validate zip code entered in form field.
   * @param {number} zip
   * @return {boolean}
   */
  validZip(zip: number) {
    if (zip != undefined) {
      if (zip.toString().length == 5) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get user zip codes from backend
   */
  fetchZips() {
    this.userservice.fetchUserZips(this.username)
      .subscribe(
        p => {
          this.userZips = p
        },
        e => {
          console.log("Error loading zips")
          this.userZips = [];
          this.flash = "Unable to load zips."
        }
      )
  }

}
