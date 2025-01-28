import { Component, OnInit } from '@angular/core';
import { TvShowSearchService } from '../services/tv-show-search.service';
import { UserService } from 'app/services/user.service';
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
  loggedIn: boolean;
  userShows: Array<number>;

  constructor(
	private searchservice: TvShowSearchService,
	private userservice: UserService
  ) { }

  ngOnInit() {
	this.loggedIn = false;

    if (localStorage.getItem('entToken') === null) {
      this.userToken = null;
    } else {
      this.userToken = localStorage.getItem('entToken');
	  this.loggedIn = true;
	  this.fetchUserData()
    }
  }

  /**
   * Get stored user data.
   */
  fetchUserData() {
	this.userservice.fetchUserData(this.userToken)
		.subscribe(
			p => {
				this.userShows = p['shows'];
			},
			e => {
				console.log("error fetching user data")
			}
		)
  }

  /**
   * Query for show from search services.
   *
   * @param {string} query
   */
  findShow(query: string) {
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
