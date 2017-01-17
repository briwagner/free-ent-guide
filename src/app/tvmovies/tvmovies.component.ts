import { Component, OnInit } from '@angular/core';
import { TvmoviesService } from '../services/tvmovies.service';

@Component({
  selector: 'app-tvmovies',
  templateUrl: './tvmovies.component.html',
  styleUrls: ['./tvmovies.component.css']
})
export class TvmoviesComponent implements OnInit {

  title: String = 'Movies on TV';
  moviesShowing;

  constructor(private tvmoviesservice: TvmoviesService) { }

  ngOnInit() {
    this.tvmoviesservice.getMovies()
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
