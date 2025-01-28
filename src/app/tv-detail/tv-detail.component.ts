import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Episode } from '../models/episode';
import { Show } from '../models/show';
import { UserService } from 'app/services/user.service';
import { TvShowSearchService } from 'app/services/tv-show-search.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
})
export class TvDetailComponent implements OnInit, OnDestroy {

  episode: Episode;
  hasEpisode: boolean = false;
  loadingEpisode: boolean = false;
  isSaved: boolean = false; // flag to toggle button disabled
  // Enable hiding, e.g. on "remove" action.
  isHidden: boolean = false;

  @Input() show: Show;
  // Enable/disable save button.
  @Input() save: boolean;
  // Enable/disable remove for saved shows.
  @Input() remove: boolean;
  @Input() userToken: string;
  @Input() userShows: Array<number>;

  constructor(
    private userservice: UserService,
    private tvshowservice: TvShowSearchService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.episode = new Episode({})
	if (this.userShows) {
		console.log("is")
	}else {
		console.log("not")
	}
	if (this.userShows && this.userShows.length > 0 && this.userShows.includes(this.show.id)) {
		// Disable Save button for saved shows.
		this.isSaved = true;
		console.log("fixed")
	}
  }

  ngOnDestroy() {
    // do nothing. Embedded comps fail without this.
  }

  hideMe() {
	  this.isHidden = true;
	  this.ref.detectChanges();
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
        p => {
			this.isSaved = true;
			this.ref.detectChanges();
		},
        e => console.log(e)
      )
    }

  /**
   * Save a show to user storage.
   *
   * @param showID
   */
  removeShow(showID) {
	if (this.userToken == undefined || this.userToken == "") {
	  console.log("cannot do that")
	  return
	}
	this.userservice.removeShow(this.userToken, showID)
	.subscribe(
	  p => {
		  this.hideMe();
	  },
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
                            // https://mokkapps.de/blog/the-last-guide-for-angular-change-detection-you-will-ever-need
                            // We use OnPush to prevent refreshing all these components at once.
                            // AS such, we have to refresh this one manually.
                            this.ref.detectChanges();
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
