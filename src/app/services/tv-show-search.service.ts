import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Episode } from '../models/episode';
import { Show } from '../models/show';
import { Observable } from 'rxjs';

@Injectable()
export class TvShowSearchService {

  private searchUrl = environment.apiBase + '/tv-search';
  private getUrl = environment.apiBase + '/tv-show/';
  private getEpisodeUrl = environment.apiBase + '/tv-show/episode/';

  constructor(private http: HttpClient) { }

  /**
   * Fetch data.
   *
   * @param {string} searchQ
   * @return {Observable}
   */
  searchShow(searchQ) {
    let params = new HttpParams().set('title', searchQ);
    let searchResults = this.http
                            .get(this.searchUrl, {
                              params: params
                            })
                          .pipe(map(resp => this.makeResult(resp)));
    return searchResults;
  }

  /**
   * Get show data for ID.
   *
   * @param showID: string
   */
  getShow(showID) {
    let results = this.http.get(this.getUrl + showID)
                           .pipe(map(resp => toShowDetail(resp)));
    return results;
  }

  /**
   * Get episode info.
   *
   * @param id: string
   */
  getEpisode(id) {
    let results = this.http.get(this.getEpisodeUrl + id)
                           .pipe(map(resp => toEpisode(resp)));
return results;
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
 * Apply data model to raw response item for search.
 *
 * @param {object} data
 * @return {Show}
 */
function toShow(data) {
  let show = new Show({
    id: data.show.id,
    title: data.show.name,
    channel: data.show.network,
    webChannel: data.show.webChannel,
    summary: data.show.summary,
    runtime: data.show.runtime,
    genres: data.show.genres,
    image: data.show.image,
    link: data.show._links.self.href,
    prev_ep: data.show._links.previousepisode ? data.show._links.previousepisode.href : '',
    next_ep: data.show._links.nextepisode ? data.show._links.nextepisode.href : ''
  });
  return show;
}

/**
 * Apply data model to raw response item for show detail.
 *
 * @param {object} data
 * @return {Show}
 */
function toShowDetail(data) {
  let show = new Show({
    id: data.id,
    title: data.name,
    channel: data.network,
    webChannel: data.webChannel,
    summary: data.summary,
    runtime: data.runtime,
    genres: data.genres,
    image: data.image,
    link: data._links.self.href,
    prev_ep: data._links.previousepisode ? data._links.previousepisode.href : '',
    next_ep: data._links.nextepisode ? data._links.nextepisode.href : ''
  });
  return show;
}

/**
 * Apply data model to raw response for episode.
 *
 * @param {object} data
 * @return {Episode}
 */
function toEpisode(data) {
  let episode = new Episode({
    id: data.id,
    title: data.name,
    summary: data.summary,
    airdate: data.airdate,
    season: data.season,
    number: data.number
  })
  return episode;
}