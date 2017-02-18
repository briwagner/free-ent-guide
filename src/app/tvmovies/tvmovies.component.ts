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

  title: String = 'Movies on TV';
  moviesShowing;
  sportsShowing;
  results;
  active: String;
  movieFilter: String;
  sportFilter: String;
  genreInput: String;

  constructor(
    private tvmoviesservice: TvmoviesService, 
    private sportsservice: SportsService,
    private searchservice: TvShowSearchService) { }

  ngOnInit() { }

  getMovies () {
    this.active = "movies";
    if (!this.moviesShowing) {
      this.tvmoviesservice.getMovies()
                      .subscribe(
                        p => this.moviesShowing = this.removeDupes(p),
                        e => console.log(e),
                        () => console.log('got movies')
                      );
    } else {
      console.log('already got movies');
    }
  }

  getSports() {
    this.active = "sports";
    if (!this.sportsShowing) {
      this.sportsservice.getSports()
                    .subscribe(
                      p => this.sportsShowing = this.removeDupes(p),
                      e => console.log(e),
                      () => console.log('got sports')
                    );
    } else {
      console.log('already got sports');
    }
  }

  getSearch() {
    this.active = "search";
    console.log('go search');
  }

  findShow(query) {
    this.active = "search";
    this.searchservice.findShow(query)
                   .subscribe(
                     p => this.results = p,
                     e => console.log(e, 'error'),
                     () => console.log('got search')
                   );
  }

  setFilter(component: String, genre: String) {
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

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }
}
