import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

import { Movie } from '../models/movie';

@Injectable()
export class DiscoverMoviesService {

  private baseUrl = environment.apiBase + "/discover"

  constructor(private http: HttpClient) { }

  /**
   * @param {Date} date - Date to query.
   * @return {Array<Movie>}
   */
  getMovies(date: Date) {
    let dateQ = this.buildDate(date);
    let param = new HttpParams().set('date', dateQ);
    let resp = this.http.get(this.baseUrl, {params: param})
                        .pipe(map(resp => this.convertMovies(resp)));
    return resp;
  }

  /**
   * @param {string} date
   * @return {string}
   */
  buildDate(date) {
    // Clone date to avoid modifying original.
    let d = new Date();
    d.setFullYear(date.getFullYear());
    d.setMonth(date.getMonth());
    // For Friday/Saturday, show current Friday. Else get last Friday.
    switch(date.getDay()){
      case 0:
        d.setDate(date.getDate() - 2);
        break;
      case 1:
        d.setDate(date.getDate() - 3);
        break;
      case 2:
        d.setDate(date.getDate() - 4);
        break;
      case 3:
        d.setDate(date.getDate() - 5);
        break;
      case 4:
        d.setDate(date.getDate() - 6);
        break;
      case 6:
        d.setDate(date.getDate() - 1);
        break;
    }
    // Date should be formatted like: "2017-10-23";
    let dateFormat = d.getFullYear() + "-" + this.padNum(d.getMonth() + 1) + "-" + this.padNum(d.getDate());
    return dateFormat;
  }

  /**
   * Filter raw response to limit to English-language,
   *   & apply data model.
   *
   * @param {Object} data - Response data.
   * @return {Array<Movie>}
   */
  convertMovies(data: any) {
    return data.results.filter(m => m.original_language == 'en').map(toMovie);
  }

  /**
   * All numbers in date elements should have two digits.
   *
   * @param {number} int
   * @return {string}
   */
  padNum(int) {
    if (int.toString().length == 1) {
      return "0" + int;
    } else {
      return int;
    }
  }

}

/**
 * Apply data model to raw response item.
 *
 * @param {object} data
 * @return {Movie}
 */
function toMovie(data) {
  let movie = new Movie({
    id: data.id,
    title : data.title,
    description: data.overview,
    poster: data.poster_path,
    release: new Date(data.release_date)
  });
  return movie;
}