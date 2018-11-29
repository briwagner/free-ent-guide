import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers } from '@angular/http';
import { map } from 'rxjs/operators';

import { Movie } from '../models/movie';

@Injectable()
export class TvmoviesService {

  private url = 'http://api.free-entertainment-guide.com/v1/tv-movies';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  /**
   * Fetch data.
   *
   * @return {Array<Movie>}
   */
  getMovies() {
    let params = new HttpParams().set('date', formatDate());
    let movies = this.http
                     .get(this.url, {
                        //  TODO: do we need headers??
                        //  headers: this.getHeaders(),
                         params: params
                      })
                      .pipe(map(resp => this.convertMovies(resp)));
    return movies;
  }

  /**
   * Process raw response.
   *
   * @param {Object} response - Response data
   * @return {Array<Movie>}
   */
  convertMovies(response) {
    return response.map((curr, i) => toMovie(curr, i));
  }

  /**
   * TODO: we need headers?
   *
   * @return {Headers}
   */
  getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}

/**
 * Apply data model to raw response item.
 *
 * @param {object} d
 * @return {Movie}
 */
function toMovie(d, i) {
  let movie = new Movie({
    id: i,
    title: d.program.title,
    genres: d.program.genres,
    description: d.program.shortDescription,
    longDescription: d.program.longDescription,
    qualityRating: d.qualityRating,
    cast: d.program.topCast,
    station: d.station.callSign,
    selected: false,
    tvshowtime: new Date(d.startTime),
    rootId: d.program ? d.program.rootId : null
  });
  return movie;
}

/**
 * Helper function for display.
 * TODO: is this better as a filter, etc.?
 *
 * @param {Array} arr
 * @return {string || any}
 */
function joinArray(arr) {
  if (typeof arr == 'object' && arr.length > 0) {
    return arr.join(", ");
  } else {
    return arr;
  }
}

/**
 * Prepare date string for http request
 *
 * @return {string}
 */
function formatDate() {
  let date = new Date();
  let arr = [date.getFullYear(),
             ("0" + (date.getMonth() + 1)).slice(-2),
             // Must offset date; api returns yesterday by default.
             ("0" + (date.getDate() + 1)).slice(-2)];
  return arr.join("-");
}