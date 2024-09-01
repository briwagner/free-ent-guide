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

  /**
   * @returns bool
   */
  IsPast() {
    if (this.airdate == "") {
      return false
    }

    let d = Date.parse(this.airdate)
    if (isNaN(d)) {
      return false
    }

    let now = new Date().getTime();
    if (now > d) {
      return false
    }

    return true
  }
}