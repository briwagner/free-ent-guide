import { Component, Inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import {UserService} from '../services/user.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent implements OnInit {

  user_email: string
  password: string
  userToken: string
  flash: string

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
    ) {
      this.userToken = cookieService.get('entToken');
    }

  ngOnInit() {
    // TODO: this should be a route guard.
    if (this.userToken != '') {
      const extras: NavigationExtras = {state: {data: "You are logged in."}}
      this.router.navigate(['/cinema'], extras)
    }
  }

  /**
   * Check if user is logged-in via token.
   *
   * @return {bool}
   */
  // private hasToken() {
  //   let name = "entToken=";
  //   let cookies = this.document.cookie;
  //   let ca = cookies.split(";");
  //   for(var i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       // return c.substring(name.length, c.length);
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  /**
   * Create new user in backend storage, from form data.
   */
  createUser() {
    this.userService.createUser(this.user_email, this.password)
      .subscribe(
        p => {
          // Backend returns 204 with no body.
          const extras: NavigationExtras = {state: {data: "New user created. Please log in."}}
          this.router.navigate(['/user/login'], extras);
        },
        e => {
          console.log(e)
          if (e.status == 500) {
            this.flash = e.error
          }
        }
      )
  }

}
