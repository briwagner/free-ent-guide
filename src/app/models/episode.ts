export class Episode {
  id: number
  title: string;
  summary: string;
  airdate: string;
  season: number;
  number: number;

  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.summary = data.summary
    this.airdate = data.airdate
    this.season = data.season
    this.number = data.number
  }
}