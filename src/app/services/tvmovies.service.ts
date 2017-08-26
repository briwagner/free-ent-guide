import { Injectable } from '@angular/core';

import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Movie } from '../models/movie';

import { Api_Key } from '../api_key';

@Injectable()
export class TvmoviesService {

  private url = 'http://data.tmsapi.com/v1.1/movies/airings';
  private api_key = Api_Key.tmsapi;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getMovies() {
    let params : URLSearchParams = new URLSearchParams();
    params.set('startDate', formatDate());
    params.set('lineupId', 'USA-TX42500-X');
    params.set("api_key", this.api_key);
    let movies = this.http.get(this.url, {headers: this.getHeaders(),
                                          search: params})
                          .map(this.convertMovies)
    return movies;
  }

  convertMovies(response: Response) {
    if (response.json()){
      return response.json().map(toMovie);
    } else {
      return false;
    }
  }

  getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}

function toMovie(d) {
  let movie = <Movie>({
    title: d.program.title,
    genres: d.program.genres,
    description: d.program.shortDescription,
    summary: d.program.longDescription,
    qualityRating: d.qualityRating ? d.qualityRating.value : "-1",
    cast: d.program.topCast,
    station: d.station.callSign,
    selected: false,
    tvshowtime: new Date(d.startTime),
    rootId: d.program ? d.program.rootId : null
  });
  return movie;
}

function joinArray(arr) {
  if (typeof arr == 'object' && arr.length > 0) {
    return arr.join(", ");
  } else {
    return arr;
  }
}

function sortShowtimes(showtimes) {
  let timeObj = {};
  let arr = [];
  for (let i = 0; i < showtimes.length; i++) {
    let id = showtimes[i].theatre.id;
    if (timeObj[id] && showtimes[i].dateTime) {
      timeObj[id].times.push(showtimes[i].dateTime);
    } else {
      timeObj[id] = {
        'name': showtimes[i].theatre.name,
        'times': [showtimes[i].dateTime]
      };
    }
  }
  for (var prop in timeObj) {
    arr.push(timeObj[prop]);
  }
  return arr;
}

function formatDate() {
  let date = new Date();
  let arr = [date.getFullYear(),
             ("0" + (date.getMonth() + 1)).slice(-2), 
             // Must offset date; api returns yesterday by default.
             ("0" + (date.getDate() + 1)).slice(-2)];
  return arr.join("-");
}