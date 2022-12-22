import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import { Flash } from 'app/models/flash';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
})
export class ZipComponent implements OnInit {

  zipCode;
  hasZip: boolean = false;
  formError: boolean = false;
  hasUser: boolean = false;
  username: string;
  userToken: any;
  userZips: Array<string>;
  flash: Flash;
  addZip: string;

  constructor(
    private userservice: UserService,
    private router: Router,
    ) {
    this.userservice.userZip$.subscribe(newVal =>  this.zipCode = newVal);
    if (localStorage.getItem('entToken') === null) {
      this.userToken = null;
    } else {
      this.userToken = localStorage.getItem('entToken');
    }
    const navigation = this.router.getCurrentNavigation();
    this.flash = new Flash;
    if (navigation.extras.state) {
      const state = navigation.extras.state as {data: string}
      this.flash.message = state.data
    }
  }

  ngOnInit() {
    // Init user var.
    this.userZips = [];

    // Check localStorage for zip code and use.
    if (localStorage.getItem('zipCode')) {
      this.storeZip(localStorage.getItem('zipCode'));
    } else if (location.search.includes('zip')) {
      let params =  new HttpParams({fromString: location.search.substring(1)});
      this.storeZip(params.get("zip"))
    }

    // Check user token, if found.
    this.checkUser();
  }

  /**
   * Check for user token, and validate .
   */
  checkUser() {
    if (this.userToken != null) {
      // Avoid setting type to JwtPayload, as the available properties
      // are limited, and will fail type validation on compile.
      let userToken = jwt_decode<any>(this.userToken);
      // Check if token is expired.
      if (userToken.exp && userToken.exp - Math.floor(Date.now() / 1000) > 0) {
        this.hasUser = true;
        // Name is not a defined property on JwtPayload.
        this.username = userToken.Name;
        this.fetchZips();
        console.log("Token expiration ", userToken.exp - Math.floor(Date.now() / 1000));
      } else {
        this.flash.message = "Your session has expired. <a href='/user/login'>Log in</a> to use your saved zip codes."
        this.flash.status = "warning";
        this.hasUser = false;
        localStorage.removeItem('entToken');
      }
    } else {
      this.hasUser = false;
    }
  }

  /**
   * Update user selected zip in app state and browser storage.
   *
   * @param data
   */
  storeZip(data) {
    this.clearFlash();

    if (this.validZip(data)) {
      localStorage.setItem('zipCode', data);
      // Update URL to add param for zipCode, without page navigation.
      window.history.replaceState({}, 'Movies in ' + data, window.location.pathname + "?zip=" + data);
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
    this.clearFlash();
    localStorage.removeItem('zipCode');
    window.history.pushState({}, 'Movies', window.location.pathname);
    this.userservice.storeZip('');
    this.hasZip = false;
  }

  /**
   * Swap active zip from inactive list.
   * @todo this is unused. Remove?
   *
   * @param {string} zip
   */
  swapZip(zip: string) {
    this.clearZip();
    this.storeZip(zip);
  }

  /**
   * Validate zip code entered in form field.
   * @param zip Zip code as string.
   * @return {boolean}
   */
  validZip(zip: string) {
    if (zip != undefined) {
      if (zip.toString().length == 5) {
        var isNumber = /\d/;
        return isNumber.test(zip);
      }
    }
    return false;
  }

  /**
   * Get user zip codes from backend
   */
  fetchZips() {
    let t = this.userToken;
    this.userservice.fetchUserZips(t)
      .subscribe(
        p => {
          this.userZips = p
        },
        e => {
          // console.log("Error loading zips", e.status)
          this.userZips = [];
          if (e.status == '401') {
            this.flash.message = "Not authorized. Please <a href='/user/login/'>log in to continue</a>"
            this.flash.status = 'warning'
            return
          }
          if (e.status == 404) {
            this.flash.message = 'No saved zip codes. Add one.'
            this.flash.status = 'info';
            return
          }
          this.flash.message = "Unable to load zips."
          this.flash.status = 'warning';
        }
      )
  }

  /**
   * Add a new zipcode to User's storage in backend.
   */
  addUserZip() {
    this.clearFlash();

    if (!this.validZip(this.addZip)) {
      this.flash.message = 'Please enter a valid U.S. zip code.'
      this.flash.status = 'warning';
      return
    }

    let newZip = this.addZip.toString();
    if (this.userZips.indexOf(newZip) != -1) {
      this.flash.message = "Zip code " + newZip + " already exists.";
      this.flash.status = 'warning';
      this.addZip = null;
      return
    }
    this.userservice.saveUserZip(this.userToken, newZip)
      .subscribe(
        p => {
          this.userZips = p;
          this.addZip = null;
        },
        e => {
          console.log(e)
        }
      )
  }

  /**
   * User-interaction to clear flash message
   */
  clearFlash() {
    this.flash.message = '';
    this.flash.status = '';
  }

  /**
   * Set flash message; called from parent.
   */
  setFlash(msg:string) {
    this.flash.message = msg;
    this.flash.status = 'info'
  }

}
