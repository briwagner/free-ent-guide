import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { MoviesService } from '../services/movies.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  animations: [
    trigger('fadeIn', [
      state('void', style({opacity:0})),
      transition(':enter', animate(750))
    ])
  ]
})
export class MoviesComponent implements OnInit {

  title: String = 'Movies';
  moviesShowing;
  userZip;
  hasData: Boolean = false;
  loading: Boolean = false;

  constructor(
    private moviesservice: MoviesService,
    private userservice: UserService
  ) {
      this.userservice.userZip$.subscribe(
        newVal => {
          newVal == '' ? this.clearUser() : this.userZip = newVal;
        }
      );
   }

  ngOnInit() {
  }

  hasMovies() {
    this.loading = false;
    if (this.moviesShowing.length > 0) {
      this.hasData = true;
    }
    this.hasData = false;
  }

  getMovies() {
    this.clearMovies();
    this.loading = true;
    this.moviesservice.getMovies(this.userZip)
                      .subscribe(
                        p => this.moviesShowing = p,
                        e => {console.log(e, 'error getting movies'); this.loading = false},
                        () => this.hasMovies()
                      );
  }

  clearMovies() {
    this.moviesShowing = [];
    this.hasData = false;
    // why do this? it clears the zip when I hit 'get movies'
    // this.userZip = '';
  }

  clearZip() {
    this.userZip = '';
  }

  clearUser() {
    this.clearMovies();
    this.clearZip();
  }

  validZip() {
    if (this.userZip != undefined) {
      if (this.userZip.toString().length == 5) {
        return true;
      }
    }
    return false;
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}