import { Injectable } from '@angular/core';

import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Sport } from '../models/sport';

import { Api_Key } from '../api_key';

@Injectable()
export class SportsService {

  private url = 'http://data.tmsapi.com/v1.1/sports/all/events/airings';
  private api_key = Api_Key;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getSports() {
    let params : URLSearchParams = new URLSearchParams();
    params.set('startDate', formatDate());
    params.set('lineupId', 'USA-TX42500-X');
    params.set("api_key", this.api_key);
    let showings = this.http.get(this.url, {headers: this.getHeaders(),
                                          search: params})
                          .map(this.convertShowings)
    return showings;
  }

  convertShowings(response: Response) {
    if (response.json()){
      return response.json().map(toSport);
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

function toSport(d) {
  let showing = <Sport>({
    title: d.program.eventTitle,
    genres: d.program.genres,
    description: d.program.shortDescription,
    image: formatImg(d.program.preferredImage.uri),
    summary: d.program.longDescription,
    station: d.station.callSign,
    showtime: new Date(d.startTime),
    rootId: d.program ? d.program.rootId : null 
  });
  return showing;
}

function formatImg(data) {
  return 'http://developer.tmsimg.com/' + data + '?api_key=' + Api_Key;
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
  let arr = [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)];
  return arr.join("-");
}