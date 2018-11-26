import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers } from '@angular/http';
import { map } from 'rxjs/operators';

import { Sport } from '../models/sport';

import { Api_Key } from '../api_key';

@Injectable()
export class SportsService {

  private url = 'http://api.free-entertainment-guide.com/v1/tv-sports';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  /**
   * Fetch data.
   *
   * @param {string} date
   * @return {Array<Sport>}
   */
  getSports(date) {
    let params = new HttpParams().set('date', formatDate(date));
    let showings = this.http
                       .get(this.url, {
                            //  headers: this.getHeaders(),
                          params: params
                        })
                      .pipe(map(resp => this.convertShowings(resp)));
    return showings;
  }

  /**
   * Process raw response.
   *
   * @param {Object} response
   * @return {Array<Sport>}
   */
  convertShowings(response) {
    return response.map(toSport);
  }

  /**
   * TODO: do we want this??
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
 * @return {Sport}
 */
function toSport(d) {
  let sport = new Sport({
    title: d.program.eventTitle,
    genres: d.program.genres,
    description: d.program.shortDescription,
    image: formatImg(d.program.preferredImage.uri),
    summary: d.program.longDescription,
    station: d.station.callSign,
    showtime: d.startTime,
    rootId: d.program ? d.program.rootId : null
  });
  return sport;
}

/**
 * Helper function for display.
 * TODO: better as filter??
 *
 * @param {string} data
 * @return {string}
 */
function formatImg(data) {
  return 'http://developer.tmsimg.com/' + data + '?api_key=' + Api_Key.tmsapi;
}

/**
 * TODO: we ever use this?
 *
 * @param arr{Array}
 * @return {string}
 */
function joinArray(arr) {
  if (typeof arr == 'object' && arr.length > 0) {
    return arr.join(", ");
  } else {
    return arr;
  }
}

/**
 * Prepare date string for http request.
 *
 * @param {Date} dateObj
 * @return {string}
 */
function formatDate(dateObj: Date) {
  let date = new Date();
  if (dateObj) {
    date.setDate(dateObj.getDate());
  }
  let arr = [date.getFullYear(),
             ("0" + (date.getMonth() + 1)).slice(-2),
             // For some reason, api is pulling in yesterday by default. So we apply offset.
             ("0" + (date.getDate() + 1)).slice(-2)];
  return arr.join("-");
}