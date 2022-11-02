import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Game, Team } from '../models/game';

@Injectable()
export class NHLGamesService {
  private urlGames = environment.apiBase + "/sports/nhl/games";
  private urlGame = environment.apiBase + "/sports/nhl/game";

  constructor(private http: HttpClient) { }

  /**
   *
   * Lookup NHL Games data by date from api.
   *
   * @param {string} date
   * @returns {Array<Game>} Set of games.
   */
  getGames(date: string) {
    let params = new HttpParams().set('date', date);
    let games = this.http
                     .get(this.urlGames, {
                         params: params
                      })
                     .pipe(map(resp => this.convertGames(resp)))
    return games;
  }

  /**
   * Lookup Game info by ID from api.
   *
   * @param {number} id
   * @returns {Game}
   */
  getGame(id: number) {
    let url = this.urlGame + "/" + id
    return this.http.get<Game>(url)
      .pipe(map(resp => this.convertGame(resp)));
  }

  /**
   * Map HTTP response to Game objects.
   *
   * @param {Object} response
   * @returns {Array<Game>}
   */
   convertGames(response) {
    if (!Array.isArray(response)) {
      return [];
    }
    return response.map((curr) => toGame(curr));
  }

  /**
   * Map HTTP response from game-update to single Game.
   *
   * @param {Object} response
   * @returns {Game}
   */
  convertGame(response) {
    let g = toGame(response.Game);
    // Assume it's more common to build games w/o status
    // info, so we add that manually here.
    g.period = response.Period;
    g.status = response.Status;
    g.visitorscore = response.VisitorScore;
    g.homescore = response.HomeScore;
    return g;
  }

}

/**
 * Apply data model to item.
 *
 * @param {Object} d
 * @returns {Game}
 */
function toGame(d) {
  let home = new Team({
    id: d.home.id,
    name: d.home.name
  });
  let visitor = new Team({
    id: d.visitor.id,
    name: d.visitor.name
  });
  let game = new Game({
    id: d.id,
    description: d.description,
    gametime: d.gametime,
  })

  game.home = home;
  game.visitor = visitor;

  return game;
}
