import { Component, OnInit, Inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnInit {

  flash: string
  user_email: string
  password: string
  private userToken: string

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
    ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const state = navigation.extras.state as {data: string}
      this.flash = state.data
    }
    this.userToken = cookieService.get('entToken')
  }

  ngOnInit() {
  }

  /**
   * Login user with form data.
   */
  loginUser() {
    this.userService.loginUser(this.user_email, this.password)
      .subscribe(
        p => {
          this.cookieService.set('entToken', p, 2, '/')
          const extras: NavigationExtras = {state: {data: "Logged in."}}
          this.router.navigate(['/cinema'], extras)
        },
        e => {
          console.log(e)
          this.flash = "Error logging in."
        }
      )
  }

}
