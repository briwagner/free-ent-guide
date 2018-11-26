import { Injectable } from '@angular/core';

import { HttpClient, HttpParams} from '@angular/common/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Movie } from '../models/movie';

@Injectable()
export class MoviesService {

  private url = "http://api.free-entertainment-guide.com/v1/movies";

  // Should be using this headers??
  // TODO: resolve this. Content-type or Accept? Or Both?
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  /**
   * Fetch data.
   *
   * @param {string} userZip
   * @return {Array<Movie>}
   */
  getMovies(userZip) {
    // TODO: create a user alert if zip doesn't validate.
    // What is a zip validation?
    let zipCode = userZip > 1 ? userZip : '20002';
    let params = new HttpParams().set('zip', zipCode);
    let movies = this.http
                     .get(this.url, {
                        //  headers: this.getHeaders(),
                         params: params
                      })
                     .pipe(map(resp => this.convertMovies(resp)))
    return movies;
  }

  /**
   * Process raw response.
   *
   * @param {Object} response - Response data
   * @return {Array<Movie>}
   */
  convertMovies(response) {
    return response.map(toMovie);
  }

  /**
   * @return {Headers}
   */
  getHeaders() {
    let headers = new Headers();
    // Do we want to set content-type header here??
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
function toMovie(d) {
  let movie = new Movie({
    title: d.title,
    genres: d.genres,
    description: d.shortDescription,
    summary: d.longDescription,
    qualityRating: d.qualityRating,
    cast: d.topCast,
    selected: false,
    showtimes: d.showtimes
  });
  return movie;
}

/**
 * Helper function for display.
 * TODO: is this better as filter, etc.?
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
 * TODO: what is this for? Should be a ng filter??
 *
 * @return {string}
 */
function formatDate() {
  let date = new Date();
  let arr = [date.getFullYear(),
             ("0" + (date.getMonth() + 1)).slice(-2),
             ("0" + date.getDate()).slice(-2)];
  return arr.join("-");
}