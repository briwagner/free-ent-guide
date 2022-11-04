import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

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
  date: Date;
  // Manage page state.
  hasMLB: boolean = false;

  constructor(private mlbGamesService: MLBGamesService) { }

  ngOnInit(): void {
    this.date = new Date();
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

}
