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
  let show = <Show>({
    title: data.show.name,
    channel: data.show.network ? data.show.network.name : 'unlisted',
    summary: data.show.summary,
    runtime: data.show.runtime,
    genres: data.show.genres,
    image: data.show.image ? data.show.image.medium : '',
    link: data.show._links.self.href,
    prev_ep: data.show._links.previousepisode ? data.show._links.previousepisode.href : '',
    next_ep: data.show._links.nextepisode ? data.show._links.nextepisode.href : ''});
  return show;
}
