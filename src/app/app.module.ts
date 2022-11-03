import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EntertainmentRouter } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoadingDotsComponent } from './loading-dots/loading-dots.component';
import { MenuComponent } from './menu/menu.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesOnTvComponent } from './movies-on-tv/movies-on-tv.component';
import { MLBGamesComponent } from './mlbgames/mlbgames.component';
import { NhlgamesComponent } from './nhlgames/nhlgames.component';
import { SearchComponent } from './search/search.component';
import { SportsComponent } from './sports/sports.component';
import { TvMenuComponent } from './tv-menu/tv-menu.component';
import { TvmoviesComponent } from './tvmovies/tvmovies.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { ZipComponent } from './zip/zip.component';

// services
import { DiscoverMoviesService } from './services/discover-movies.service';
import { MLBGamesService } from './services/mlbgamesservice.service';
import { MoviesService } from './services/movies.service';
import { NHLGamesService } from './services/nhlgames.service';
import { SportsService } from './services/sports.service';
import { TvmoviesService } from './services/tvmovies.service';
import { TvShowSearchService } from './services/tv-show-search.service';
import { UserService } from './services/user.service';

import { AuthGuard } from './auth.guard';

// pipes
import { StripHTMLtagsPipe } from './strip-htmltags.pipe';
import { GenrePipe } from './genre.pipe';
import { DurationPipePipe } from './duration-pipe.pipe';

// production mode
import { enableProdMode } from '@angular/core';
import { UserAccountComponent } from './user-account/user-account.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ZipComponent,
    SportsComponent,
    TvmoviesComponent,
    LandingComponent,
    LoadingDotsComponent,
    MenuComponent,
    MLBGamesComponent,
    MoviesOnTvComponent,
    NhlgamesComponent,
    SearchComponent,
    TvMenuComponent,
    UserCreateComponent,
    UserLoginComponent,
    UserLogoutComponent,
    UserLandingComponent,
    StripHTMLtagsPipe,
    GenrePipe,
    DurationPipePipe,
    UserAccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EntertainmentRouter,
    BrowserAnimationsModule
  ],
  providers: [
    DiscoverMoviesService,
    MLBGamesService,
    NHLGamesService,
    MoviesService,
    TvmoviesService,
    SportsService,
    UserService,
    TvShowSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
