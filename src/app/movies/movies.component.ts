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

  constructor(
    private moviesservice: MoviesService,
    private userservice: UserService
  ) {
      this.userservice.userZip$.subscribe(newVal =>  this.userZip = newVal);
   }

  ngOnInit() {
    // this.userZip = this.userservice.returnZip();
    this.moviesservice.getMovies()
                      .subscribe(
                        p => this.moviesShowing = p,
                        e => console.log(e)
                      );
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}