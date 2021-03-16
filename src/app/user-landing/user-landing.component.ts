import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
})
export class UserLandingComponent implements OnInit {

  links: Array<Object>;

  constructor() { }

  ngOnInit() {
    this.setLinks();
  }

  /**
   * Set links
   */
  setLinks() {
    this.links = [
      {url: '/user/login', title: 'Login'},
      {url: '/user/logout', title: 'Logout'},
      {url: '/user/new', title: 'Create a user'}
    ]
  }


}
