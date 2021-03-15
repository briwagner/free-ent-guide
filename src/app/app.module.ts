import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { EntertainmentRouter } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { SportsComponent } from './sports/sports.component';
import { TvmoviesComponent } from './tvmovies/tvmovies.component';
import { ZipComponent } from './zip/zip.component';
import { LandingComponent } from './landing/landing.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { MoviesOnTvComponent } from './movies-on-tv/movies-on-tv.component';

// services
import { MoviesService } from './services/movies.service';
import { TvmoviesService } from './services/tvmovies.service';
import { SportsService } from './services/sports.service';
import { UserService } from './services/user.service';
import { TvShowSearchService } from './services/tv-show-search.service';
import { DiscoverMoviesService } from './services/discover-movies.service';

import { AuthGuard } from './auth.guard';

// pipes
import { StripHTMLtagsPipe } from './strip-htmltags.pipe';
import { GenrePipe } from './genre.pipe';

// production mode
import { enableProdMode } from '@angular/core';
import { TvMenuComponent } from './tv-menu/tv-menu.component';
import { LoadingDotsComponent } from './loading-dots/loading-dots.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { CookieService } from 'ngx-cookie-service';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ZipComponent,
    SportsComponent,
    TvmoviesComponent,
    LandingComponent,
    MenuComponent,
    StripHTMLtagsPipe,
    GenrePipe,
    SearchComponent,
    MoviesOnTvComponent,
    TvMenuComponent,
    LoadingDotsComponent,
    UserCreateComponent,
    UserLoginComponent,
    UserLogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    EntertainmentRouter,
    BrowserAnimationsModule
  ],
  providers: [
    MoviesService,
    TvmoviesService,
    SportsService,
    UserService,
    TvShowSearchService,
    DiscoverMoviesService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
