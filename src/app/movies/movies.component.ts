import { Component, OnInit, Input } from '@angular/core';

import { MoviesService } from '../services/movies.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  title: String = 'Movies';
  moviesShowing;
  userZip;
  hasData;

  constructor(
    private moviesservice: MoviesService,
    private userservice: UserService
  ) {
      this.userservice.userZip$.subscribe(newVal =>  this.userZip = newVal);
   }

  ngOnInit() {
    this.hasData = false;
  }

  hasMovies() {
    if (this.moviesShowing.length > 0) {
      this.hasData = true;
      return true;
    }
    this.hasData = false;
    return false;
  }

  getMovies() {
    this.moviesservice.getMovies(this.userZip)
                      .subscribe(
                        p => this.moviesShowing = p,
                        e => console.log(e),
                        () => this.hasMovies()
                      );
  }

  validZip() {
    if (this.userZip != undefined) {
      if (this.userZip.toString().length == 5) {
        return true;
      }
    }
    return false;
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}