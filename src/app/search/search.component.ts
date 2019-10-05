import { Component, OnInit } from '@angular/core';
import { TvShowSearchService } from '../services/tv-show-search.service';
import { Show } from '../models/show';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  results: Array<Show>;
  loading: Boolean;
  queryString: String;
  errorMsg: String = '';

  constructor(private searchservice: TvShowSearchService) { }

  ngOnInit() {
  }

  findShow(query) {
    this.queryString = query;
    this.loading = true;
    this.results = [];
    this.errorMsg = '';
    this.searchservice.findShow(query)
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
