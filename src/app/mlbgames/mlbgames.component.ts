import { Component, Input, OnInit } from '@angular/core';
import { formatDate, KeyValue } from '@angular/common';

import { MLBGamesService } from '../services/mlbgamesservice.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-mlbgames',
  templateUrl: './mlbgames.component.html',
  styleUrls: ['../nhlgames/nhlgames.component.scss']
})
export class MLBGamesComponent implements OnInit {

  // Hold results for MLBGamesService.
  mlbgames: Object;
  // Date to use in queries.
  @Input() date: Date;
  // Manage page state.
  hasMLB: boolean = false;

  constructor(private mlbGamesService: MLBGamesService) { }

  ngOnInit(): void {
    this.getMLB();
  }

  /**
   * Fetch MLB games from service and load on component.
   */
  getMLB() {
    let d = formatDate(this.date, "yyyy-MM-dd", 'en_us')
    this.mlbGamesService.getGames(d)
      .subscribe(
        p => {
          let hash = Object.fromEntries(
            p.map(v => [v.ID, v])
          )
          // console.log(hash)
          this.mlbgames = hash
        },
        e => {
          // Do not register error as message to user.
          // @todo simply don't show this section?
          console.log('Error:', e.message);
        },
        () => {
          this.hasMLB = Object.keys(this.mlbgames).length > 0 ? true : false;
        }
      )
  }

  /**
   * Change date for MLB game lookup.
   *
   * @param {number} i
   *   Buttons should pass 1 or -1 to change day.
   */
  changeDate(i: number) {
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
    this.getMLB();
    // @todo navigate user focus up to games
  }

  /**
   * Fetch score and info from api by game ID.
   *
   * @param {number} id
   */
     checkGame(id: number) {
      this.mlbGamesService.getGame(id)
        .subscribe(
          p => {
            let update = p
            if (!this.mlbgames[update.ID]) {
              console.log("cannot update game")
            } else {
              // Push updated game back to component.
              update.updated = true;
              this.mlbgames[update.ID] = update;
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
      return g.status;
    }
    if (g.status == "Scheduled") {
      return formatDate(g.gametime, 'shortTime', 'en_us');
    }
    if (g.status == "Pre-Game") {
      return "Pre";
    }
    if (g.period) {
      return g.period;
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
