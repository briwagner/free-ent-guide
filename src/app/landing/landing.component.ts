import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DiscoverMoviesService } from '../services/discover-movies.service';
import { NHLGamesService } from '../services/nhlgames.service';
import { TvShowSearchService } from '../services/tv-show-search.service';
import { StripHTMLtagsPipe } from '../strip-htmltags.pipe';

import { Game } from '../models/game';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  animations: [
    trigger('fadeIn', [
      state('void', style({opacity: 0})),
      transition('void => *', animate('1s 510ms')),
    ]),
    trigger('fadeOut', [
      state('loading', style({opacity: 1})),
      transition(':leave', animate(400, style({opacity:0}))),
    ])
  ]
})
export class LandingComponent implements OnInit {

  // Hold results for DiscoverMoviesService.
  discovers;
  // Hold results for NHLGamesService.
  nhlgames: Object;
  // Hold results for search.
  results;
  // Date to use in queries to movies, sports services.
  date: Date;
  // Manage page state.
  isLoading: boolean = true;
  hasNHL: boolean = false;
  errorMsg: string = '';

  constructor(
    private discoverMovies: DiscoverMoviesService,
    private nhlGamesService: NHLGamesService,
    private showSearch: TvShowSearchService
  ) {
   }

  ngOnInit() {
    this.date = new Date();
    this.getMovies();
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
   * Load discover movies from service and load on component.
   */
  getMovies() {
    this.discoverMovies.getMovies(this.date)
      .subscribe(
        p => this.discovers = p,
        e => {
          console.log('Error:', e.message)
          this.errorMsg = "Failed to get listings.";
        },
        () => this.isLoading = false
      );
  }

  /**
   * Fetch search results from service and load on component.
   *
   * @param {string} query
   */
  findShow(query: string) {
    this.showSearch.findShow(query)
                   .subscribe(
                     p => this.results = p,
                     e => console.log(e, 'error'),
                   );
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

  /**
   * Helper to join array elements and not throw error.
   *
   * @param {any} arr
   */
  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}
