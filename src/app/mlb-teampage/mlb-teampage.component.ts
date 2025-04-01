import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { MLBGamesService } from '../services/mlbgamesservice.service';
import { Game, Team } from '../models/game';

@Component({
  selector: 'app-mlb-teampage',
  templateUrl: './mlb-teampage.component.html',
  styleUrls: ['../nhlgames/nhlgames.component.scss']
})
export class MlbTeampageComponent {
	team: Team;
	team_id: string;
	// Manage page state.
	hasMLB:  boolean = false;
	loading: boolean = true;

	constructor(
		private route: ActivatedRoute,
		private mlbGamesService: MLBGamesService
	) {}

	ngOnInit() {
		this.team_id = this.route.snapshot.paramMap.get('id')
		this.getTeamData();
	}

	/**
	 * Fetch team info and games from API.
	 */
	getTeamData() {
		this.mlbGamesService.getTeamData(this.team_id)
		  .subscribe(
			p => {
				// console.log("success", p)
				this.team = p
			},
			e => {
				console.log("error", e)
			},
			() => {
				this.hasMLB = Object.keys(this.team.games).length > 0 ? true : false;
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

}
