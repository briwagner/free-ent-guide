import { Component, Inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
    ) {
      if (localStorage.getItem('entToken') === null) {
        // no token
      } else {
        this.userToken = localStorage.getItem('entToken');
      }
    }

  ngOnInit() {
    // TODO: this should be a route guard.
    if (this.userToken != null) {
      const extras: NavigationExtras = {state: {data: "You are logged in."}}
      this.router.navigate(['/cinema'], extras)
    }
  }

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
