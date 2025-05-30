import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, formatDate, KeyValue, ViewportScroller } from '@angular/common';

import { NHLGamesService } from '../services/nhlgames.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-nhlgames',
  templateUrl: './nhlgames.component.html',
  styleUrls: ['./nhlgames.component.scss']
})
export class NhlgamesComponent implements OnInit {

  // Hold results for NHLGamesService.
  nhlgames: Object;
  // TODO this should load only when nhlgames is empty.
  nextgames: Object;
  nextGametime: string;
  // Date to use in queries; should come from parent component.
  @Input() date: Date;
  // Manage page state.
  hasNHL: boolean = false;
  hasNext: boolean = false;
  loading: boolean = true;

  constructor(
    private nhlGamesService: NHLGamesService,
    private scroll: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getNHL();
	// TODO wait for games or not.
    this.getNext();
  }

  /**
   * Fetch NHL games from service and load on component.
   */
   getNHL() {
    let d = formatDate(this.date, "yyyy-MM-dd", 'en_us')
    this.nhlGamesService.getGames(d)
      .subscribe(
        p => {
          let hash = Object.fromEntries(
            p.map(v => [v.ID, v])
          )
          this.nhlgames = hash
        },
        e => {
          // Do not register error as message to user.
          // @todo simply don't show this section?
          console.log('Error:', e.message);
          this.loading = false;
        },
        () => {
          this.hasNHL = Object.keys(this.nhlgames).length > 0 ? true : false;
          this.loading = false;
        }
      )
  }

  /**
   * Fetch from service to show when no games on selected date.
   */
    getNext() {
      let d = formatDate(this.date, "yyyy-MM-dd", 'en_us')
      this.nhlGamesService.getNext()
        .subscribe(
          p => {
            let hash = Object.fromEntries(
              p.map(v => [v.ID, v])
            )
            this.nextgames = hash
          },
          e => {
            // Do not register error as message to user.
            // @todo simply don't show this section?
            console.log('Error:', e.message);
          },
          () => {
            if (Object.keys(this.nextgames).length > 0) {
              this.hasNext = true
              this.nextGametime = Object.values(this.nextgames)[0].gametime
            }
          }
        )
    }

  /**
   * Change date for NHL game lookup.
   *
   * @param {number} i
   *   Buttons should pass 1 or -1 to change day.
   */
  changeDate(i: number) {
    // Clear next; we need logic to show this at the right time.
    this.nextGametime = '';
    this.hasNext = false;

    let t = this.date;
    if (i === 1) {
      t.setDate(t.getDate() + 1);
    }
    else if (i === -1) {
      t.setDate(t.getDate() - 1);
    }
    this.date = new Date(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes()
    );
    this.getNHL();
    this.scroll.scrollToAnchor('nhl-top')
  }

  /**
   * Fetch score and info from api by game ID.
   *
   * @param {number} id
   */
     checkGame(id: number) {
      this.nhlGamesService.getGame(id)
        .subscribe(
          p => {
            let update = p
            if (!this.nhlgames[update.ID]) {
              console.log("cannot update game")
            } else {
              // Push updated game back to component.
              update.updated = true;
              this.nhlgames[update.ID] = update;
            }
          },
          e => console.log(e),
          () => {
            // @todo do something? update item.
          }
        )
    }

  /**
   * Helper to dynamically display relevant game status,
   * which can be updated upon user request.
   */
   getGameStatus(g: Game) {
    if (g.status == "Final") {
      if (g.period > 3) {
        return "F/" + g.period;
      } else {
        return g.status;
      }
    }
    if (g.status == "Scheduled") {
      return formatDate(g.gametime, 'shortTime', 'en_us');
    }
    if (g.status == "Pre-Game") {
      return "Pre";
    }
    if (g.period) {
      return "P" + g.period;
    }
    return formatDate(g.gametime, 'shortTime', 'en_us');
  }

  /**
   * Override key order and use gametime early to late.
   * @param a
   * @param b
   * @returns
   */
  gametimeOrder = (a: KeyValue<number,any>, b: KeyValue<number,any>): number => {
    return a.value.gametime > b.value.gametime ? 1 : -1;
  }

}
