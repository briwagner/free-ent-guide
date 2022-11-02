export class Team {
  ID: number;
  name: string;
  score: number;

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
  homescore: number;
  visitorscore: number;
  updated: boolean;

  constructor(data) {
    this.ID = data.id;
    this.description = data.description;
    this.gametime = data.gametime;
    this.updated = false;
  }
}

