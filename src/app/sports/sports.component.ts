import { Component, OnInit } from '@angular/core';
import { SportsService } from '../services/sports.service';
import { TvMenuComponent } from '../tv-menu/tv-menu.component';
import { GenrePipe } from '../genre.pipe';
import { Sport } from '../models/sport';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
})
export class SportsComponent implements OnInit {

  title: string = "Sports on TV";
  sportsShowing: Array<Sport>;
  loading: Boolean = false;
  sportFilter: string;
  dateOffset: number = 0;
  schedDate: Date;
  sportInput: string;
  errorMsg: string = '';

  constructor(private sportsservice: SportsService) { }

  ngOnInit() {
    this.schedDate = new Date();
    this.getSports()
  }

  getSports() {
    this.loading = true;
    // Don't query for results again, if data is present.
    if (this.sportsShowing) return;

    this.sportsservice.getSports(this.schedDate)
                      .subscribe(
                        p => this.sportsShowing = this.removeDupes(p),
                        e => {
                          console.log(e);
                          this.loadedShows();
                          this.errorMsg = "Failed to get listings.";
                        },
                        () => this.loadedShows()
                      );
  }

  loadedShows() {
    this.loading = false;
  }

  setFilter(genre: string) {
    this.sportFilter = genre;
    this.sportInput = genre;
  }

  removeDupes(arr) {
    let unique = [];
    let uniqueIds = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].rootId && uniqueIds.indexOf(arr[i].rootId) < 1) {
        unique.push(arr[i]);
        uniqueIds.push(arr[i].rootId);
      }
    }
    return unique;
  }

  changeDate(offset) {
    this.dateOffset += offset;
    let date = new Date();
    let newDate = date.setDate(date.getDate() + this.dateOffset);
    this.schedDate = new Date(newDate);
    this.sportsShowing = null;
    this.getSports();
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}
