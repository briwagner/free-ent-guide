import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../models/show';
import { TvShowSearchService } from 'app/services/tv-show-search.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
})
export class TvShowComponent implements OnInit {

  errorMsg: string = '';
  id: string
  loading: Boolean
  show: Show;
  userToken: string;

  constructor(private route: ActivatedRoute, private tvservice: TvShowSearchService) { }

  ngOnInit(): void {
    this.show = new Show({})
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id')
    this.getShow()

    if (localStorage.getItem('entToken') === null) {
      this.userToken = null;
    } else {
      this.userToken = localStorage.getItem('entToken');
    }
  }

  /**
   * Get show detail info from backend.
   *
   */
  getShow() {
    this.tvservice.getShow(this.id)
                  .subscribe(
                    p => {
                      console.log(p)
                      this.show = p
                    },
                    e => {
                      this.loading = false;
                      this.errorMsg = e.message;
                    },
                    () => this.loading = false
                  )

  }

}
