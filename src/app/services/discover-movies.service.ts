import { Injectable } from '@angular/core';

import { HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

import { Movie } from '../models/movie';

@Injectable()
export class DiscoverMoviesService {

  private baseUrl = "http://api.free-entertainment-guide.com/v1/discover";

  constructor(private http: HttpClient) { }

  /**
   * @param {string} date - Date to query.
   * @return {Array<Movie>}
   */
  getMovies(date) {
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
    // For Friday/Saturday, show current Friday. Else get last Friday.
    switch(date.getDay()){
      case 0:
        date.setDate(date.getDate() - 2);
        break;
      case 1:
        date.setDate(date.getDate() - 3);
        break;
      case 2:
        date.setDate(date.getDate() - 4);
        break;
      case 3:
        date.setDate(date.getDate() - 5);
        break;
      case 4:
        date.setDate(date.getDate() - 6);
        break;
      case 6:
        date.setDate(date.getDate() - 1);
        break;
    }
    // Date should be formatted like: "2017-10-23";
    let dateFormat = date.getFullYear() + "-" + this.padNum(date.getMonth() + 1) + "-" + this.padNum(date.getDate());
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