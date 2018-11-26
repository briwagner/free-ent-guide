export class Movie {
  id: number;
  title: string;
  genres: Array<string>=[];
  qualityRating: string;
  description: string;
  summary: string;
  showtimes: Array<Object>;
  tvshowtime: Date;
  cast: Array<string>;
  station: string;
  selected: boolean;
  poster_img: string;
  rootId: string;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.poster_img = this.setPoster(data.poster)
  }

  public setPoster (path: string): string {
    let baseUrl = "http://image.tmdb.org/t/p/w185";
    if (path) {
      return baseUrl + path;
    } else {
      return '';
    }
  }
}