import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

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
  // Date to use in queries to movies, sports services.
  date: Date;
  // Manage page state.
  hasNHL: boolean = false;

  constructor(
    private nhlGamesService: NHLGamesService
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    this.getNHL();
  }

  /**
   * Fetch NHL games from service and load on component.
   */
   getNHL() {
    let d = formatDate(this.date, "yyyy-MM-dd", 'en_us')
    this.nhlGamesService.getGames(d)
      .subscribe(
        p => {
          // @todo convert to map {gameID: game} to allow updating with score.
          let hash = Object.fromEntries(
            p.map(v => [v.ID, v])
          )
          // console.log(hash)
          this.nhlgames = hash
        },
        e => {
          // Do not register error as message to user.
          // @todo simply don't show this section?
          console.log('Error:', e.message);
        },
        () => {
          this.hasNHL = Object.keys(this.nhlgames).length > 0 ? true : false;
        }
      )
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
        return "F/" + g.period
      } else {
        return g.status
      }
    }
    if (g.period) {
      return "P" + g.period
    }
    return formatDate(g.gametime, 'shortTime', 'en_us')
  }

}
