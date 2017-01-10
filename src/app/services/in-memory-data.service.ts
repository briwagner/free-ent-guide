import { InMemoryDbService } from 'angular-in-memory-web-api';
import { URLSearchParams } from '@angular/http';
import { RawMovies } from './rawmovies';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let movies = [
      {title: 'a super good movie'},
      {title: 'another good movie'}
    ];
    let showings = [
      {title: 'showing one'},
      {title: 'showing two'}
    ];
    let diggings = [
      {name: 'thingamore'},
      {name: 'dudebottom'}
    ];
    return {
      showings,
      diggings, 
      movies};
  }
}