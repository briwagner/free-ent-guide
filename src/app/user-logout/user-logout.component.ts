import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
})
export class UserLogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService
    ) { }

  ngOnInit() {
    // Todo: Redirect if no token found.
  }

  /**
   * Delete token cookie.
   * Todo: send logout to backend?
   */
  logout() {
    this.cookieService.delete('entToken', '/')
    this.router.navigate(['/'])
  }

}
