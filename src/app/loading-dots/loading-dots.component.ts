import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, sequence, transition } from '@angular/animations';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-loading-dots',
  templateUrl: './loading-dots.component.html',
  styleUrls: ['./loading-dots.component.css'],
  animations: [
    trigger('scrolling', [
      state('void', style({r: 0})),
      transition(
        ':enter', [
          sequence([
            animate(250, style({r: '16px'})),
            animate(500, style({opacity: 1, transform: 'translateX(100px)'})),
            animate(250, style({opacity:0, r: 0}))
          ])
        ]),
      state("*", style({opacity: 0}))
    ])
  ]
})
export class LoadingDotsComponent implements OnInit {

  constructor() { }

  dots: Array<number> = [1];
  private ngUnsubscribe: Subject<any> = new Subject();

  ngOnInit() {
    let int = interval(500)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.dots.push(x)
        console.log(x)
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
  }

}
