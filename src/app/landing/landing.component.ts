import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { TvShowSearchService } from '../services/tv-show-search.service';
import { DiscoverMoviesService } from '../services/discover-movies.service';
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

  results; // what is this for?
  date: Date;
  discovers;
  discoverCount;
  isLoading: boolean = true;

  constructor(
    private showSearch: TvShowSearchService,
    private discoverMovies: DiscoverMoviesService
  ) {
   }

  ngOnInit() {
    this.date = new Date();
    this.getMovies();
  }

  getMovies() {
    this.discoverMovies.getMovies(this.date)
      .subscribe(
        p => {
          this.discovers = p;
          this.discoverCount = p.length;
        },
        e => console.log('Error:', e.message),
        () => this.isLoading = false
      );
  }

  findShow(query) {
    this.showSearch.findShow(query)
                   .subscribe(
                     p => this.results = p,
                     e => console.log(e, 'error'),
                   );
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

  getFriday(): any {
    let today = new Date();
    let day = today.getDay();
    if (day < 5) {
      return today.setDate( today.getDate() - 1 );
    } else if (day > 5) {
      return today.setDate( today.getDate() + (5 - day) );
    } else {
      return today;
    }
  }

}
