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
    let dateFormat = date.getFullYear() + "-" + this.padNum(date.getMonth() + 1) + "-" + this.padNum(date.getDate());
    dateFormat = "2017-08-23";
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
    let movie = {
      title : data.title,
      description: data.overview
    }
    return movie;
  }