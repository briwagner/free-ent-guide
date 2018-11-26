import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Show } from '../models/show';

@Injectable()
export class TvShowSearchService {

  private url = 'http://api.free-entertainment-guide.com/v1/tv-search';

  constructor(private http: HttpClient) { }

  /**
   * Fetch data.
   *
   * @param {string} searchQ
   * @return {Array<Show>}
   */
  findShow(searchQ) {
    let params = new HttpParams().set('title', searchQ);
    let searchResults = this.http
                            .get(this.url, {
                              params: params
                            })
                          .pipe(map(resp => this.makeResult(resp)));
    return searchResults;
  }

  /**
   * Process raw response.
   *
   * @param {Object} response - Response data.
   * @return {Array<Show>}
   */
  makeResult(response) {
    return response.map(toShow);
  }
}

/**
 * Apply data model to raw response item.
 *
 * @param {object} data
 * @return {Show}
 */
function toShow(data) {
  let show = new Show({
    title: data.show.name,
    channel: data.show.network,
    summary: data.show.summary,
    runtime: data.show.runtime,
    genres: data.show.genres,
    image: data.show.image,
    link: data.show._links.self.href,
    prev_ep: data.show._links.previousepisode ? data.show._links.previousepisode.href : '',
    next_ep: data.show._links.nextepisode ? data.show._links.nextepisode.href : ''});
  return show;
}
