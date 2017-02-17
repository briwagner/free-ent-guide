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
  genreFilter: String;
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
                        p => this.moviesShowing = p,
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
                      p => this.sportsShowing = p,
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

  setFilter(genre: String) {
    this.genreFilter = genre;
    console.log(genre);
    console.log(this.genreFilter);
    console.log(this.moviesShowing.length);
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }
}
