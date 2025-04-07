export class Team {
  ID:        number;
  name:      string;
  score:     number;
  nextGames: Array<Game>;
  pastGames: Array<Game>;
  standings: Array<Standing>;
  division:  string;

  constructor(data) {
    this.ID   = data.id;
    this.name = data.name;
  }
}

export class Game {
  ID:           number;
  description:  string;
  gametime:     Date;
  home:         Team;
  visitor:      Team;
  period:       number;
  status:       string;
  completed:    boolean;
  homescore:    number;
  visitorscore: number;
  updated:      boolean;

  constructor(data) {
    this.ID = data.id;
    this.description = data.description;
    this.gametime = data.gametime;
    this.updated = false;
    this.completed = false;
  }

  /**
   * IsFinal responds if game status is 'Final'.
   *
   * @returns bool
   */
  IsFinal() {
    return this.status == "Final";
  }
}

export class Standing {
	team:    Team;
	wins:    number;
	losses:  number;
	ties:    number;
	pct:     string;
	divRank: string;
	lgRank:  string;

	constructor(data) {
		this.divRank = data.divisionRank;
		this.lgRank  = data.leagueRank;
		this.wins    = data.leagueRecord.wins;
		this.losses  = data.leagueRecord.losses;
		this.ties    = data.leagueRecord.ties;
		this.pct     = data.leagueRecord.pct
		this.team    = new Team(data.team);
	}
}
