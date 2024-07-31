import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
})
export class UserLandingComponent implements OnInit {

  links: Array<Object>;
  user_action: string;
  private userToken: string

  constructor(private router: Router, private userservice: UserService) {
    let storedTok = localStorage.getItem('entToken');

    if (storedTok != null) {
      if (!this.userservice.checkUser(storedTok)) {
        console.log("failed user")
        localStorage.removeItem('entToken');
        this.userToken = null;
        return
      }
      this.userToken = storedTok;
    } else {
      this.userToken = null;
    }
  }

  ngOnInit() {
    if (this.userToken != null && this.userToken != "") {
      this.router.navigate(['/user/account'])
    }
  }

  /**
   * Allow modal-style actions to appear dynamically.
   */
  setAction(action: string) {
    this.user_action = action;
  }

}
