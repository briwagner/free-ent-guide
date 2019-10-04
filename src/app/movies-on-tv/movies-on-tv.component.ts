import { Component, OnInit } from '@angular/core';
import { TvmoviesService } from '../services/tvmovies.service';
import { GenrePipe } from '../genre.pipe';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies-on-tv',
  templateUrl: './movies-on-tv.component.html',
  animations: [
    trigger('fadeIn', [
      state('void', style({opacity:0})),
      transition(':enter', animate(1000))
    ]),
    trigger('expand', [
      state('void', style({opacity: 0})),
      transition(':enter', animate(2000))
    ])
  ]
})
export class MoviesOnTvComponent implements OnInit {

  moviesShowing: Array<Movie>;
  movieFilter: string;
  movieInput: string;
  loading: Boolean;

  constructor(private tvmoviesservice: TvmoviesService) { }

  ngOnInit() {
    this.getMovies()
  }

  getMovies () {
    if (!this.moviesShowing) {
      this.loading = true;
      this.tvmoviesservice.getMovies()
                      .subscribe(
                        p => this.moviesShowing = this.removeDupes(p),
                        e => {
                          console.log(e)
                          this.loadedShows()
                        },
                        () => this.loadedShows()
                      );
    }
  }

  loadedShows() {
    this.loading = false;
  }

  setFilter(genre: string) {
    this.movieFilter = genre;
    this.movieInput = genre;
  }

  removeDupes(arr) {
    let unique = [];
    let uniqueIds = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].rootId && uniqueIds.indexOf(arr[i].rootId) < 0) {
        unique.push(arr[i]);
        uniqueIds.push(arr[i].rootId);
      }
    }
    return unique;
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}
