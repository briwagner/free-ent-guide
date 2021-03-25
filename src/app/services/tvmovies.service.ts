import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Movie } from '../models/movie';

@Injectable()
export class TvmoviesService {

  private url = environment.apiBase + '/tv-movies';

  constructor(private http: HttpClient) { }

  /**
   * Fetch data.
   *
   * @param {Date} date
   * @return {Array<Movie>}
   */
  getMovies(date) {
    let params = new HttpParams().set('date', formatDate(date));
    let movies = this.http
                     .get(this.url, {
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
 * @param {Date} dateObj
 * @return {string}
 */
function formatDate(dateObj) {
  let date = new Date();
  if (dateObj) {
    date.setDate(dateObj.getDate());
  }
  let dateFormatted = [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + (date.getDate())).slice(-2)
  ].join("-");
  dateFormatted = dateFormatted + "T";

  // Convert locale date to UTC.
  let tz = date.getTimezoneOffset();
  let offsetHrs = Math.abs(tz / 60);
  let offsetMins = Math.abs(tz % 60);
  let utcHours, utcMins;
  // West of UTC.
  if (tz > 0) {
    utcHours = date.getHours() + offsetHrs;
    utcMins = date.getMinutes() + offsetMins;
  } else { // East of UTC.
    utcHours = date.getHours() - offsetHrs;
    utcMins = date.getMinutes() - offsetMins;
  }
  dateFormatted += ("0" + utcHours).slice(-2);
  dateFormatted += ":";
  dateFormatted += ("0" + utcMins).slice(-2);
  // Only seems reliable to send UTC to api, so append the TZ code.
  dateFormatted += "Z";

  return dateFormatted;
}