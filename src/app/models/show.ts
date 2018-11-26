export class Show {
  title: string;
  channel:string;
  summary:string;
  runtime: number;
  genres: Array<string>;
  image: string;
  link: string;
  prev_ep: string;
  next_ep: string;

  constructor(data) {
    this.title = data.title;
    this.channel = data.channel != null ? data.channel.name : 'unlisted';
    this.summary = data.summary;
    this.runtime = data.runtime;
    this.genres = data.genres;
    this.image = data.image ? data.image.medium : '';
    this.link = data.link;
    this.prev_ep = data.prev_ep;
    this.next_ep = data.next_exp;
  }
}