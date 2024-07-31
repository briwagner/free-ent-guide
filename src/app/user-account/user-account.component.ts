import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Flash } from 'app/models/flash';
import { Router } from '@angular/router';
import { Show } from '../models/show';
import { TvShowSearchService } from 'app/services/tv-show-search.service';
import { UserService } from 'app/services/user.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {

  flash: Flash;
  formError: boolean = false;
  newZip: string;
  username: string;
  userToken: any;
  userZips: Array<string>;
  userShows: Array<number>;
  userShowDetails: Array<Show>;

  constructor(
    private userservice: UserService,
    private tvservice: TvShowSearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('entToken') === null) {
      this.userToken = null;
    } else {
      this.userToken = localStorage.getItem('entToken');
    }

    this.flash = new Flash;
    this.userZips = [];
    this.userShows = [];
    this.userShowDetails = [];
    this.fetchUserData();
  }

  /**
   * Get stored user data.
   */
  fetchUserData() {
    this.username = this.userservice.checkUser(this.userToken);
    if (this.username) {
      this.userservice.fetchUserData(this.userToken)
        .subscribe(
          p => {
            this.userZips = p['zipcodes'];
            this.userShows = p['shows'];
            this.fetchShowData(p['shows']);
          },
          e => {
            if (e.status == '401') {
              this.flash.message = "Not authorized. Please <a href='/user/login/'>log in to continue</a>"
              this.flash.status = 'warning'
              return
            }
            if (e.status == 404) {
              this.flash.message = 'No saved user data.'
              this.flash.status = 'info';
              return
            }
            this.flash.message = "Unable to load user data."
            this.flash.status = 'warning';
          }
        )
    } else {
      console.log("Cannot get username")
    }
  }

  /**
   * Fetch show data
   */
  fetchShowData(ids: Array<string>) {
    if (ids.length == 0) {
      console.log("no user shows")
      return
    }
    for (let i = 0; i < ids.length; i++) {
      this.tvservice.getShow(ids[i])
          .subscribe(
            p => {
              this.userShowDetails.push(p)
            },
            e => console.log(e)
          )
    }
  }

  /**
   * Store new zip in user storage.
   *
   * @param {string} newZip
   */
  storeZip(newZip: string) {
    this.clearFlash();

    if (!this.validZip(newZip)) {
      this.flash.message = 'Please enter a valid zip';
      this.flash.status = 'warning';
      return;
    }

    this.userservice.saveUserZip(this.userToken, newZip)
      .subscribe(
        p => {
          this.userZips = p;
        },
        e => {
          this.flash.message = 'Error saving zip';
          this.flash.status = 'warning';
        },
        () => {
          this.newZip = '';
        }
      )
  }

  /**
   * Validate zip code entered in form field.
   * @param {string} zip
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
   * Clear flash message.
   */
  clearFlash() {
    this.flash = new Flash
  }

  /**
   * Delete zip from user storage.
   *
   * @param {string} zip
   */
  deleteZip(zip: string) {
    this.clearFlash();

    this.userservice.deleteZip(this.userToken, zip)
      .subscribe(
        p => {
          this.flash.message = `Zip ${zip} removed`;
          this.flash.status = 'info';
          if (p) {
            this.userZips = p;
          }
        },
        e => {
          this.flash.message = `Error: ${e}`;
          this.flash.status = 'warning';
        }
      )
  }

  /**
   * Delete token.
   */
  logout() {
    localStorage.removeItem('entToken')
    this.userservice.logoutUser(this.userToken).subscribe(
      p => this.router.navigate(['/']),
      e => console.log(e)
    )
  }

}
