export class Team {
  ID: number;
  name: string;
  score: number;
  nextGames: Array<Game>;
  pastGames: Array<Game>;

  constructor(data) {
    this.ID = data.id;
    this.name = data.name;
  }
}

export class Game {
  ID: number;
  description: string;
  gametime: Date;
  home: Team;
  visitor: Team;
  period: number;
  status: string;
  completed: boolean;
  homescore: number;
  visitorscore: number;
  updated: boolean;

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
