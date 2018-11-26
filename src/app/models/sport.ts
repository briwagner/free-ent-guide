export class Sport {
  title: string;
  type: string;
  genres: Array<string>;
  image: string;
  description: string;
  summary: string;
  station: string;
  showtime: Date;
  rootId: string;

  constructor(data) {
    this.title = data.title;
    this.genres = data.genres;
    this.description = data.description;
    this.summary = data.summary;
    this.image = data.image;
    this.station = data.station;
    this.showtime = new Date(data.showtime);
    this.rootId = data.rootId;
  }
}