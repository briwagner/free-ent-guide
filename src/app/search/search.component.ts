import { Component, OnInit } from '@angular/core';
import { TvShowSearchService } from '../services/tv-show-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  results;
  loading: Boolean;
  queryString: string;

  constructor(private searchservice: TvShowSearchService) { }

  ngOnInit() {
  }

  findShow(query) {
    this.queryString = query;
    this.searchservice.findShow(query)
                      .subscribe(
                        p => this.results = p,
                        e => console.log(e, 'error'),
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
