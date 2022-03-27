import { Component, OnInit, Inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Flash } from 'app/models/flash';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit {

  flash: Flash
  user_email: string
  password: string
  private userToken: string

  constructor(
    private userService: UserService,
    private router: Router,
    ) {
    const navigation = this.router.getCurrentNavigation();
    this.flash = new Flash;
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as {data: string}
      this.flash.message = state.data
    }
    if (localStorage.getItem('entToken') != null) {
      this.userToken = localStorage.getItem('entToken');
    } else {
      this.userToken = null;
    }
  }

  ngOnInit() {
    // TODO: this should be a route guard.
    if (this.userToken) {
      const extras: NavigationExtras = {state: {data: "You are logged in."}}
      this.router.navigate(['/cinema'], extras)
    }
  }

  /**
   * Login user with form data.
   */
  loginUser() {
    this.userService.loginUser(this.user_email, this.password)
      .subscribe(
        p => {
          localStorage.setItem('entToken', p)
          const extras: NavigationExtras = {state: {data: "Logged in."}}
          this.router.navigate(['/cinema'], extras)
        },
        e => {
          console.log(e)
          this.flash.message = "Error logging in."
          this.flash.status = "warning"
        }
      )
  }

}
