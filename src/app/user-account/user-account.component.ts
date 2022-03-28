import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Flash } from 'app/models/flash';
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

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('entToken') === null) {
      this.userToken = null;
    } else {
      this.userToken = localStorage.getItem('entToken');
    }

    this.flash = new Flash;
    this.userZips = [];
    this.fetchZips();
  }

  /**
   * Get user zip codes from backend.
   */
  fetchZips() {
    this.username = this.userservice.checkUser(this.userToken);
    if (this.username) {
      this.userservice.fetchUserZips(this.username, this.userToken)
        .subscribe(
          p => {
            this.userZips = p
          },
          e => {
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
    } else {
      console.log("Cannot get username")
    }
  }

  /**
   * Store new zip in user storage.
   *
   * @param {string} newZip
   */
  storeZip(newZip) {
    this.clearFlash();

    if (!this.validZip(newZip)) {
      this.flash.message = 'Please enter a valid zip';
      this.flash.status = 'warning';
      return;
    }

    this.userservice.saveUserZip(this.username, this.userToken, newZip)
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
  deleteZip(zip) {
    this.clearFlash();

    this.userservice.deleteZip(this.username, this.userToken, zip)
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

}
