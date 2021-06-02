import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
})
export class UserLandingComponent implements OnInit {

  links: Array<Object>;
  user_action: string;

  constructor() { }

  ngOnInit() {
    this.setLinks();
  }

  /**
   * Allow modal-style actions to appear dynamically.
   */
  setAction(action: string) {
    this.user_action = action;
  }

  /**
   * Set links
   */
  setLinks() {
    this.links = [
      {url: '/user/login', title: 'Login', action: 'login'},
      {url: '/user/logout', title: 'Logout', action: 'logout'},
      {url: '/user/new', title: 'Create a user', action: 'create'}
    ]
  }


}
