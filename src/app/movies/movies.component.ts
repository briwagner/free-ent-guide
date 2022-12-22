import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { MoviesService } from '../services/movies.service';
import { UserService } from '../services/user.service';
import { Movie } from '../models/movie';
import { DatePipe } from '@angular/common';
import { ZipComponent } from 'app/zip/zip.component';

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

  @ViewChild(ZipComponent)
  // Bang avoids TS warning that this cannot be nullable,
  // which it seems to be upon init in a parent.
  private zipComponent!: ZipComponent;

  title: string = 'Movies';
  moviesShowing: Array<Movie>;
  userZip: any;
  hasData: Boolean = false;
  loading: Boolean = false;
  errorMsg: string = '';
  schedDate: Date;
  datepipe: DatePipe;

  constructor(
    private moviesservice: MoviesService,
    private router: Router,
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
      this.datepipe = new DatePipe('en-us');

    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const state = navigation.extras.state as {data: string}
      this.setError(state.data)
    }
  }

  ngOnInit() {
    this.schedDate = new Date();
  }

  /**
   * Call to fetch the movie data.
   */
  getMovies() {
    this.zipComponent.clearFlash();
    this.clearMovies();
    this.loading = true;
    this.moviesservice.getMovies(this.userZip, this.datepipe.transform(this.schedDate, "yyyy-MM-dd"))
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
                          this.setError("Failed to get listings");
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
    this.setError('');
    this.moviesShowing = [];
    this.hasData = false;
  }

  /**
   * Reset zip.
   */
  clearZip() {
    this.userZip = '';
  }

  /**
   * Reset movies and zip selection.
   */
  clearUser() {
    this.clearMovies();
    this.clearZip();
  }

  /**
   * Set error message
   */
  setError(msg:string) {
    this.errorMsg = msg;
  }

  /**
   * Validate user-entered zip.
   *
   * @returns bool
   */
  validZip() {
    if (this.userZip != undefined) {
      if (this.userZip.toString().length == 5) {
        return true;
      }
    }
    return false;
  }

  /**
   * Change schedule-date used to fetch listings.
   *
   * @param incr string
   */
  chgSchedDate(incr: string) {
    let nd = new Date(this.schedDate);
    if (incr == "1") {
      nd.setDate(this.schedDate.getDate() + 1);
    }
    if (incr == "-1") {
      nd.setDate(this.schedDate.getDate() - 1);
    }
    let today = new Date();
    if (nd.getMonth() == today.getMonth() && nd.getDate() < today.getDate()) {
      this.setError('Invalid date');
      return
    }

    this.schedDate = nd;
    this.getMovies();
  }

  /**
   * Utility function to merge.
   *
   * @param {Array<string>} arr
   * @returns {Array}
   */
  joinArray(arr: Array<string>) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}