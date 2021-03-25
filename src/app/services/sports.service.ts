import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Sport } from '../models/sport';

import { Api_Key } from '../api_key';

@Injectable()
export class SportsService {

  private url = environment.apiBase + '/tv-sports';

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