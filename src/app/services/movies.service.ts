import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Movie } from '../models/movie';

@Injectable()
export class MoviesService {

  private url = environment.apiBase + "/movies";

  constructor(private http: HttpClient) { }

  /**
   * Fetch data.
   *
   * @param {string} userZip
   * @param {string} date
   * @return {Array<Movie>}
   */
  getMovies(userZip: string, date: string) {
    // TODO: create a user alert if zip doesn't validate.
    // What is a zip validation?
    let zip = parseInt(userZip);
    let zipCode = zip > 1 ? userZip : '20002';
    let params = new HttpParams().set('zip', zipCode).set('date', date);
    let movies = this.http
                     .get(this.url, {
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
    if (!Array.isArray(response)) {
      return [];
    }
    return response.map((curr, i) => toMovie(curr, i));
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
    cast: d.topCast,
    description: d.shortDescription,
    genres: d.genres,
    longDescription: d.longDescription,
    qualityRating: d.qualityRating,
    rating: d.ratings,
    runtime: d.runTime,
    selected: false,
    showtimes: d.showtimes,
    title: d.title
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