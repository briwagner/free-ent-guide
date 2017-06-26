import { Component, OnInit } from '@angular/core';
import { SportsService } from '../services/sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  title: string = "Sports on TV";
  sportsShowing;

  constructor(private sportsservice: SportsService) { }

  ngOnInit() {
    this.fetchSports();
  }

  fetchSports() {
    this.sportsservice.getSports(0)
                      .subscribe(
                        p => this.sportsShowing = this.removeDupes(p),
                        e => console.log(e)
                      );
  }

  removeDupes(arr) {
    let unique = [];
    let uniqueIds = [];
    for (var i = 0; i < arr.length; i++) {
      if (uniqueIds.indexOf(arr[i].rootId) < 1) {
        unique.push(arr[i]);
        uniqueIds.push(arr[i].rootId);
      }
    }
    return unique;
  }

  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}
