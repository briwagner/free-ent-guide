export class Show {
  id: number;
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
    this.id = data.id
    this.title = data.title;
    if (data.channel !== undefined && data.channel !== null) {
      this.channel = data.channel.name;
    } else if (data.webChannel !== undefined && data.webChannel !== null) {
      this.channel = data.webChannel.name;
    } else {
      this.channel = 'Unlisted';
    }
    this.summary = data.summary;
    this.runtime = data.runtime;
    this.genres = data.genres;
    this.image = data.image ? data.image.medium : '';
    this.link = data.link;
    this.prev_ep = data.prev_ep;
    this.next_ep = data.next_ep;
  }
}