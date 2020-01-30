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
  release: Date;

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.genres = data.genres;
    this.description = data.description ? data.description : data.shortDescription;
    this.summary = data.longDescription;
    this.qualityRating = this.setRating(data.qualityRating);
    this.cast = data.cast;
    this.poster_img = this.setPoster(data.poster)
    this.showtimes = this.sortShowtimes(data.showtimes);
    this.tvshowtime = data.tvshowtime;
    this.station = data.station;
    this.selected = false;
    this.rootId = data.rootId;
    this.release = data.release;
  }

  public setPoster (path: string): string {
    let baseUrl = "http://image.tmdb.org/t/p/w185";
    if (path) {
      return baseUrl + path;
    } else {
      return '';
    }
  }

  public setRating(rating) {
    if (rating) {
      return rating.value
    } else {
      return "-1";
    }
  }

  public sortShowtimes(showtimes) {
    if (!showtimes) return;
    let timeObj = {};
    let arr = [];
    for (let i = 0; i < showtimes.length; i++) {
      let id = showtimes[i].theatre.id;
      if (timeObj[id] && showtimes[i].dateTime) {
        timeObj[id].times.push(showtimes[i].dateTime);
      } else {
        timeObj[id] = {
          'name': showtimes[i].theatre.name,
          'times': [showtimes[i].dateTime],
          'ticketURI' : showtimes[i].ticketURI
        };
      }
    }
    for (var prop in timeObj) {
      arr.push(timeObj[prop]);
    }
    return arr;
  }
}