import { Component, OnInit } from '@angular/core';
import { TvShowSearchService } from '../services/tv-show-search.service';
import { Show } from '../models/show';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  errorMsg: string = '';
  loading: Boolean;
  queryString: string;
  results: Array<Show>;
  userToken: any;

  constructor(private searchservice: TvShowSearchService) { }

  ngOnInit() {
    if (localStorage.getItem('entToken') === null) {
      this.userToken = null;
    } else {
      this.userToken = localStorage.getItem('entToken');
    }
  }

  findShow(query) {
    this.queryString = query;
    this.loading = true;
    this.results = [];
    this.errorMsg = '';
    this.searchservice.searchShow(query)
                      .subscribe(
                        p => {
                          this.results = p;
                          p.length < 1 ? this.errorMsg = 'No results found' : this.errorMsg = '';
                        },
                        e => {
                          console.log(e, 'error');
                          this.errorMsg = "Failed to complete search.";
                          this.loading = false;
                        },
                        () => this.loadedShows()
                      )
  }

  loadedShows() {
    this.loading = false;
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}
