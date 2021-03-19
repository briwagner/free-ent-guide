import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
})
export class UserLogoutComponent implements OnInit {

  private userToken: string
  hasToken: boolean

  constructor(private router: Router) {
    if (localStorage.getItem('entToken') === null) {
      this.hasToken = false;
    } else {
      this.userToken = localStorage.getItem('entToken');
      this.hasToken = true;
    }
  }

  ngOnInit() {
  }

  /**
   * Delete token.
   * Todo: send logout to backend?
   */
  logout() {
    localStorage.removeItem('entToken')
    this.router.navigate(['/'])
  }

}
