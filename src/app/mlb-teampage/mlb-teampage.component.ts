import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate, KeyValue } from '@angular/common';

import { MLBGamesService } from '../services/mlbgamesservice.service';
import { Game, Team } from '../models/game';

@Component({
  selector: 'app-mlb-teampage',
  templateUrl: './mlb-teampage.component.html',
  styleUrls: ['../nhlgames/nhlgames.component.scss']
})
export class MlbTeampageComponent {
	team: Team;
	teamID: string;

	// Manage page state.
	hasNext:  boolean = false;
	hasPast:  boolean = false;
	loading: boolean = true;

	constructor(
		private route: ActivatedRoute,
		private mlbGamesService: MLBGamesService
	) {}

	ngOnInit() {
		this.teamID = this.route.snapshot.paramMap.get('id')
		this.getTeamData();
	}

	/**
	 * Fetch team info and games from API.
	 */
	getTeamData() {
		this.mlbGamesService.getTeamData(this.teamID)
		  .subscribe(
			p => {
				// console.log("success", p)
				this.team = p
			},
			e => {
				console.log("error", e)
			},
			() => {
				this.hasNext = Object.keys(this.team.nextGames).length > 0 ? true : false;
				this.hasPast = Object.keys(this.team.pastGames).length > 0 ? true : false;
				this.loading = false
			}
		  )
	}

	/**
	 * Helper to dynamically display relevant game status,
	 * which can be updated upon user request.
	 *
	 * @param {Game} g
	 * @returns {string}
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
