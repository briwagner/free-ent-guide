import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TvmoviesService } from '../services/tvmovies.service';
import { SportsService } from '../services/sports.service';
import { TvShowSearchService } from '../services/tv-show-search.service';
import { StripHTMLtagsPipe } from '../strip-htmltags.pipe';
import { GenrePipe } from '../genre.pipe';

@Component({
  selector: 'app-tvmovies',
  templateUrl: './tvmovies.component.html',
  styleUrls: ['./tvmovies.component.css']
})
export class TvmoviesComponent implements OnInit {

  title: string = 'Movies on TV';
  moviesShowing;
  sportsShowing;
  results;
  loading: Boolean;
  active: string;
  movieFilter: string;
  sportFilter: string;
  genreInput: string;
  date_offset: number;
  sched_date;
  // Inputs from template.
  movieInput;
  sportInput;
  queryString;

  constructor(
    private tvmoviesservice: TvmoviesService,
    private sportsservice: SportsService,
    private searchservice: TvShowSearchService) { }

  ngOnInit() {
    this.date_offset = 0;
    this.sched_date = new Date();
    this.loading = false;
  }

  getMovies () {
    this.active = "movies";
    if (!this.moviesShowing) {
      this.loading = true;
      this.tvmoviesservice.getMovies()
                      .subscribe(
                        p => this.moviesShowing = this.removeDupes(p),
                        e => console.log(e),
                        () => this.loadedShows()
                      );
    }
  }

  getSports() {
    this.active = "sports";
    if (!this.sportsShowing) {
      this.loading = true;
      this.sportsservice.getSports(this.sched_date)
                    .subscribe(
                      p => this.sportsShowing = this.removeDupes(p),
                      e => console.log(e),
                      () => this.loadedShows()
                    );
    }
  }

  loadedShows() {
    this.loading = false;
  }

  getSearch() {
    this.active = "search";
  }

  findShow(query) {
    this.active = "search";
    this.searchservice.findShow(query)
                   .subscribe(
                     p => this.results = p,
                     e => console.log(e, 'error'),
                   );
  }

  setFilter(component: string, genre: string) {
    switch(component) {
      case 'movie':
        this.movieFilter = genre;
        break;
      case 'sport':
        this.sportFilter = genre;
        break;
    }
  }

  removeDupes(arr) {
    let unique = [];
    let uniqueIds = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].rootId && uniqueIds.indexOf(arr[i].rootId) < 1) {
        unique.push(arr[i]);
        uniqueIds.push(arr[i].rootId);
      }
    }
    return unique;
  }

  changeDate(offset) {
    this.date_offset += offset;
    let date = new Date();
    let newDate = date.setDate(date.getDate() + this.date_offset);
    this.sched_date = new Date(newDate);
    this.sportsShowing = null;
    this.getSports();
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }
}
