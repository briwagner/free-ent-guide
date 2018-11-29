import { Component, OnInit } from '@angular/core';
import { SportsService } from '../services/sports.service';
import { GenrePipe } from '../genre.pipe';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
})
export class SportsComponent implements OnInit {

  title: string = "Sports on TV";
  sportsShowing;
  results;
  loading: Boolean;
  active: string;
  sportFilter: string;
  date_offset: number;
  sched_date;
  sportInput;

  constructor(private sportsservice: SportsService) { }

  ngOnInit() {
    this.date_offset = 0;
    this.sched_date = new Date();
    this.loading = false;
    this.getSports()
  }

  getSports() {
    this.loading = true;
    // Don't query for results again, if data is present.
    if (this.sportsShowing) return;

    this.sportsservice.getSports(this.sched_date)
                      .subscribe(
                        p => this.sportsShowing = this.removeDupes(p),
                        e => {
                          console.log(e)
                          // this.loadedShows()
                        },
                        () => this.loadedShows()
                      );
  }

  loadedShows() {
    this.loading = false;
  }

  setFilter(genre: string) {
    this.sportFilter = genre;
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
    this.date_offset += offset;
    let date = new Date();
    let newDate = date.setDate(date.getDate() + this.date_offset);
    this.sched_date = new Date(newDate);
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
