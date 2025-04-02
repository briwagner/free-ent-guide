import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Game, Team } from '../models/game';

@Injectable()
export class MLBGamesService {

  private urlGames = environment.apiBase + "/sports/mlb/games";
  private urlGame  = environment.apiBase + "/sports/mlb/game";
  private urlTeam  = environment.apiBase + "/sports/mlb/team/";

  constructor(private http: HttpClient) { }

  /**
   * Get team info, next games, and past games by ID.
   *
   * @param {string} id
   * @returns {Observable}
   */
  getTeamData(id: string) {
	let url = this.urlTeam + id;
	let data = this.http.get(url)
			 .pipe(map(resp => this.convertTeamData(resp)))
	return data;
  }

  /**
   * Lookup MLB Games data by date from api.
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
    let g = toGame(response);
    // Assume it's more common to build games w/o status
    // info, so we add that manually here.
    g.period = response.inning
    g.status = response.status;
    g.visitorscore = response.visitor_score;
    g.homescore = response.home_score;
    return g;
  }

  /**
   * Map HTTP response to team data and games.
   *
   * @param {Object} response
   * @returns {Team}
   */
  convertTeamData(response) {
	let t = new Team({id: response.Team.id, name: response.Team.name})
	if (Array.isArray(response.NextGames)) {
		t.nextGames = response.NextGames.map((curr) => toGame(curr));
	}
	if (Array.isArray(response.PastGames)) {
		t.pastGames = response.PastGames.map((curr) => toGame(curr));
	}

	console.log("got team", t)
	return t
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
  game.status = d.status;
  // Set score only if game is underway or finished.
  if (game.status == "Final") {
    game.homescore = d.home_score;
    game.visitorscore = d.visitor_score;
  }
  game.completed = d.status == "Final";

  return game;
}

