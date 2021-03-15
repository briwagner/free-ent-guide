import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { MoviesService } from '../services/movies.service';
import { UserService } from '../services/user.service';
import { Movie } from '../models/movie';

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

  title: string = 'Movies';
  moviesShowing: Array<Movie>;
  userZip: any;
  hasData: Boolean = false;
  loading: Boolean = false;
  errorMsg: string = '';

  constructor(
    private moviesservice: MoviesService,
    private userservice: UserService
  ) {
      this.userservice.userZip$.subscribe(
        newVal => {
          this.clearUser()
          if (newVal != '') {
           this.userZip = newVal;
          }
        }
      );
   }

  ngOnInit() {}

  /**
   * Call to fetch the movie data.
   */
  getMovies() {
    this.clearMovies();
    this.loading = true;
    this.moviesservice.getMovies(this.userZip)
                      .subscribe(
                        p => {
                          this.moviesShowing = p;
                          // API may return empty response.
                          if (this.moviesShowing.length == 0) {
                            this.errorMsg = "No showings found.";
                          }
                        },
                        e => {
                          this.loading = false;
                          this.errorMsg = "Failed to get listings";
                        },
                        () => this.hasMovies()
                      );
  }

  /**
   * Clean up after fetching movies.
   */
  hasMovies() {
    this.loading = false;
    if (this.moviesShowing.length > 0) {
      this.hasData = true;
    } else {
      this.hasData = false;
    }
  }

  /**
   * Reset page in response to user interaction.
   */
  clearMovies() {
    this.errorMsg = '';
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