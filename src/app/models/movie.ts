export class Movie {
  id: number;
  cast: Array<string>;
  description: string;
  genres: Array<string>=[];
  poster_img: string;
  qualityRating: number = 0;
  rating: string;
  release: Date;
  rootId: string;
  runtime: string;
  selected: boolean;
  showtimes: Array<Object>;
  station: string;
  summary: string;
  title: string;
  tvshowtime: Date;

  constructor(data) {
    this.id = data.id;
    this.cast = data.cast;
    this.description = data.description ? data.description : data.shortDescription;
    this.genres = data.genres;
    this.poster_img = this.setPoster(data.poster)
    this.qualityRating = this.setRating(data.qualityRating);
    this.rating = this.setContentRating(data.rating);
    this.release = data.release;
    this.rootId = data.rootId;
    this.runtime = data.runtime;
    this.selected = false;
    this.showtimes = this.sortShowtimes(data.showtimes);
    this.station = data.station;
    this.summary = data.longDescription;
    this.title = data.title;
    this.tvshowtime = data.tvshowtime;
  }

  /**
   * Format image path.
   *
   * @param path string
   * @returns string
   */
  public setPoster (path: string): string {
    let baseUrl = "http://image.tmdb.org/t/p/w185";
    if (path) {
      return baseUrl + path;
    } else {
      return '';
    }
  }

  /**
   * Format quality rating.
   *
   * @param rating string
   * @returns string
   */
  public setRating(rating) {
    if (rating) {
      return parseInt(rating.value)
    } else {
      return 0;
    }
  }

  /**
   * Extract content rating from payload.
   *
   * @param ratings Array<string>
   * @returns string
   */
  public setContentRating(ratings) {
    if (ratings && ratings.length && ratings[0].code) {
      return ratings[0].code;
    }
    return '';
  }

  /**
   * Extract showtimes.
   *
   * @param showtimes Array<any>
   * @returns Array<any>
   */
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