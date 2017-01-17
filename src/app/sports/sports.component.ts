import { Component, OnInit } from '@angular/core';
import { SportsService } from '../services/sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  title: String = "Sports on TV";
  sportsShowing;

  constructor(private sportsservice: SportsService) { }

  ngOnInit() {
    this.sportsservice.getSports()
                      .subscribe(
                        p => this.sportsShowing = p,
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
