import { Component, OnInit } from '@angular/core';
import { TvmoviesService } from '../services/tvmovies.service';
import { GenrePipe } from '../genre.pipe';

@Component({
  selector: 'app-movies-on-tv',
  templateUrl: './movies-on-tv.component.html',
})
export class MoviesOnTvComponent implements OnInit {

  moviesShowing;
  movieFilter: string;
  loading: Boolean;
  movieInput: string;

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
