import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
})
export class UserLogoutComponent implements OnInit {

  private userToken: string
  hasToken: boolean

  constructor(
    private router: Router,
    private userservice: UserService
    ) {
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
   */
  logout() {
    if (this.hasToken) {
      localStorage.removeItem('entToken')
      this.userservice.logoutUser(this.userToken).subscribe(
        p => console.log('logged out'),
        e => console.log(e),
        () => this.router.navigate(['/'])
      )
    }
  }

}
