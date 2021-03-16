import { Component, OnInit, Input, Inject } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { NavigationExtras, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode, {JwtPayload} from 'jwt-decode';

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
  flash: string;
  addZip: number;

  constructor(
    private userservice: UserService,
    private router: Router,
    private cookieService: CookieService,
    ) {
    this.userservice.userZip$.subscribe(newVal =>  this.zipCode = newVal);
    this.userToken = cookieService.get('entToken')
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const state = navigation.extras.state as {data: string}
      this.flash = state.data
    }
  }

  ngOnInit() {
    // Init user var.
    this.userZips = [];

    // Check localStorage for zip code and use.
    if (localStorage.getItem('zipCode')) {
      this.storeZip(localStorage.getItem('zipCode'));
    } else if (location.search.includes('zip')) {
      let params =  new URLSearchParams(location.search.substring(1));
      this.storeZip(params.get("zip"))
    }

    if (this.userToken != '') {
      this.hasUser = true;
      let decoded = jwt_decode<JwtPayload>(this.userToken);
      this.username = decoded.sub;
      this.fetchZips();
    } else {
      this.hasUser = false;
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
    let t = this.userToken;
    this.userservice.fetchUserZips(this.username, t)
      .subscribe(
        p => {
          this.userZips = p
        },
        e => {
          // console.log("Error loading zips", e.status)
          this.userZips = [];
          if (e.status == '401') {
            this.flash = "Not authorized. Please <a href='/user/login/'>log in to continue</a>"
            return
          }
          if (e.status == 404) {
            this.flash = 'No saved zip codes. Add one.'
            return
          }
          this.flash = "Unable to load zips."
        }
      )
  }

  /**
   * Add a new zipcode to User's storage in backend.
   */
  addUserZip() {
    if (this.validZip(this.addZip)) {
      let newZip = this.addZip.toString();
      if (this.userZips.indexOf(newZip) != -1) {
        this.flash = "Zip code " + newZip + " already exists.";
        this.addZip = null;
        return
      }
      this.userservice.saveUserZip(this.username, this.userToken, newZip)
        .subscribe(
          p => {
            this.userZips = p;
            this.addZip = null;
          },
          e => {
            console.log(e)
          }
        )
    } else {
      console.log('bad zip')
    }
  }

  /**
   * User-interaction to clear flash message
   */
  clearFlash() {
    this.flash = '';
  }

}
