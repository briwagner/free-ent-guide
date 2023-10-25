import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Flash } from 'app/models/flash';

@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html',
})
export class AddGamesComponent implements OnInit {

  dateString: string;
  public disabled: boolean;
  flash: Flash;
  userToken: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.disabled = false;
    let d = new Date()
    this.dateString = this.buildDateString(d)

    if (localStorage.getItem('entToken') === null) {
      this.userToken = null;
    } else {
      this.userToken = localStorage.getItem('entToken');
    }

    this.flash = new Flash;
  }

  /**
   * Button submit action.
   */
  addGames() {
    this.disabled = !this.disabled;

    this.clearFlash();

    this.userService.addGames(this.userToken, this.dateString)
      .subscribe(
        p => {
          this.flash.message = "Games added"
          this.flash.status = 'info';
          this.disabled = !this.disabled;
        },
        e => {
          if (e.status == '401') {
            this.flash.message = "Not authorized. Please <a href='/user/login/'>log in to continue</a>"
            this.flash.status = 'warning'
          } else {
            this.flash.message = `Error: ${e.error}`
            this.flash.status = 'warning'
          }
          this.disabled = !this.disabled
        },
      )
  }

  /**
   * Build date string with padding.
   *
   * @param d Date
   * @returns string
   */
  buildDateString(d: Date) {
    let ds = d.getFullYear().toString() + "-"
    let m = d.getMonth() + 1
    let dd = d.getDate() + 1

    if (m < 10) {
      ds = ds + "0"
    }
    ds = ds + m + "-"
    if (dd < 10) {
      ds = ds + "0"
    }
    ds = ds + dd

    return ds
  }

  /**
   * Clear flash message.
   */
  clearFlash() {
    this.flash = new Flash
  }

}
