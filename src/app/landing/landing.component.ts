import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DiscoverMoviesService } from '../services/discover-movies.service';
import { TvShowSearchService } from '../services/tv-show-search.service';
import { StripHTMLtagsPipe } from '../strip-htmltags.pipe';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  animations: [
    trigger('fadeIn', [
      state('void', style({opacity: 0})),
      transition('void => *', animate('1s 510ms')),
    ]),
    trigger('fadeOut', [
      state('loading', style({opacity: 1})),
      transition(':leave', animate(400, style({opacity:0}))),
    ])
  ]
})
export class LandingComponent implements OnInit {

  // Hold results for DiscoverMoviesService.
  discovers;
  // Hold results for search.
  results;
  date: Date;
  // Date to use in queries to movies, sports services.
  dateMLB: Date;
  dateNHL: Date;
  // Manage page state.
  isLoading: boolean = true;
  errorMsg: string = '';

  constructor(
    private discoverMovies: DiscoverMoviesService,
    private showSearch: TvShowSearchService
  ) {
   }

  ngOnInit() {
    let d = new Date();
    d.setHours(12);
    this.date = d
    this.dateMLB = d
    this.dateNHL = d
    this.getMovies(d);
  }

  /**
   * Load discover movies from service and load on component.
   */
  getMovies(d: Date) {
    this.discoverMovies.getMovies(d)
      .subscribe(
        p => this.discovers = p,
        e => {
          console.log('Error:', e.message)
          this.errorMsg = "Failed to get listings.";
        },
        () => this.isLoading = false
      );
  }

  /**
   * Fetch search results from service and load on component.
   *
   * @param {string} query
   */
  findShow(query: string) {
    this.showSearch.findShow(query)
                   .subscribe(
                     p => this.results = p,
                     e => console.log(e, 'error'),
                   );
  }

  /**
   * Helper to join array elements and not throw error.
   *
   * @param {any} arr
   */
  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}
