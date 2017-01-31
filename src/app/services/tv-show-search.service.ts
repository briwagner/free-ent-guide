import { Injectable } from '@angular/core';

import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Show } from '../models/show';

@Injectable()
export class TvShowSearchService {

  private url = 'http://api.tvmaze.com/search/shows';

  constructor(private http: Http) { }

  findShow(searchQ) {
    let params : URLSearchParams = new URLSearchParams();
    params.set('q', searchQ);
    let searchResults = this.http.get(this.url, {search: params})
                          .map(this.makeResult);
    return searchResults;
  }

  makeResult(response: Response) {
    if (response.json()) {
      return response.json().map(toShow);
    } else {
      return false;
    }
  }
}

function toShow(data) {
  let show = new Show;
  show.title = data.show.name;
  show.channel = data.show.network.name;
  show.summary = data.show.summary;
  show.runtime = data.show.runtime;
  show.genres = data.show.genres;
  show.image = data.show.image.medium;
  return show;
}
