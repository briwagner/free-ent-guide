import { Component, Input, OnInit } from '@angular/core';
import { Episode } from '../models/episode';
import { Show } from '../models/show';
import { UserService } from 'app/services/user.service';
import { TvShowSearchService } from 'app/services/tv-show-search.service';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
})
export class TvDetailComponent implements OnInit {

  episode: Episode;
  hasEpisode: boolean = false;
  loadingEpisode: boolean = false;
  @Input() show: Show;
  // Enable/disable save button
  @Input() save: boolean;
  @Input() userToken: string;
  saved: boolean = false;

  constructor(private userservice: UserService, private tvshowservice: TvShowSearchService) { }

  ngOnInit(): void {
    this.episode = new Episode({})
  }

  /**
   * Save a show to user storage.
   *
   * @param showID
   */
    saveShow(showID) {
      if (this.userToken == undefined || this.userToken == "") {
        console.log("cannot do that")
        return
      }
      this.userservice.addShow(this.userToken, showID)
      .subscribe(
        p => this.saved = true,
        e => console.log(e)
      )
    }

  /**
   * Fetch episode info.
   */
  getEpisode(link: string) {
    this.loadingEpisode = true;

    if (link == undefined || link == "") {
      console.log("bad link")
      this.loadingEpisode = false;
      return
    }
    try {
      let url = new URL(link);
      let episodeID = url.pathname.split('/').pop()

      this.tvshowservice.getEpisode(episodeID)
                        .subscribe(
                          p => {
                            this.episode = p;
                            this.hasEpisode = true;
                            this.loadingEpisode = false;
                          },
                          e => {
                            console.log(e);
                            this.hasEpisode = false;
                            this.loadingEpisode = false;
                          }
                        )
    } catch (e) {
      console.log("bad url", e.message)
    }
  }

  /**
   * Helper function shared globally.
   */
  joinArray(arr) {
    if (typeof arr == 'object' && arr.length > 0) {
      return arr.join(", ");
    } else {
      return arr;
    }
  }

}
