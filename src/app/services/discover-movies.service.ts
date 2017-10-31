import { Injectable } from '@angular/core';

import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Movie } from '../models/movie';

import {Api_Key} from '../api_key';

@Injectable()
export class DiscoverMoviesService {

  private baseUrl = "https://api.themoviedb.org/3/discover/movie?";
  private api_key = Api_Key.moviedb;

  constructor(private http: Http) { }

  getMovies(date) {
    let url = this.buildUrl(date);
    let movies = this.http.get(url)
      .map(this.convertMovies);
    return movies;
  }

  buildUrl(date) {
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
        date.setDate(date.getDAte() - 5);
        break;
      case 4: 
        date.setDate(date.getDate() - 6);
        break;
      case 6:
        date.setDate(date.getDate() - 1);
        break;
    }
    let dateFormat = date.getFullYear() + "-" + this.padNum(date.getMonth() + 1) + "-" + this.padNum(date.getDate());
    // dateFormat = "2017-10-23";
    return this.baseUrl + "api_key=" + this.api_key + "&primary_release_date.gte=" + dateFormat + "&adult=false";
  }

  convertMovies(data: Response) {
    if (data.json()){
      let json = data.json();
      return json.results.filter(m => m.original_language == 'en').map(toMovie);
    }
  }

  padNum(int) {
    if (int.toString().length == 1) {
      return "0" + int;
    } else {
      return int;
    }
  }

}

function toMovie(data) {
  let baseUrl_poster = "http://image.tmdb.org/t/p/w185";
    let movie = {
      id: data.id,
      title : data.title,
      description: data.overview,
      poster_img: data.poster_path ? baseUrl_poster + data.poster_path : ''
    }
    return movie;
  }