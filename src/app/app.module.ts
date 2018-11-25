import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EntertainmentRouter } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MoviesComponent } from './movies/movies.component';
import { SportsComponent } from './sports/sports.component';
import { TvmoviesComponent } from './tvmovies/tvmovies.component';
import { ZipComponent } from './zip/zip.component';
import { LandingComponent } from './landing/landing.component';
import { MenuComponent } from './menu/menu.component';

// services
import { MoviesService } from './services/movies.service';
import { TvmoviesService } from './services/tvmovies.service';
import { SportsService } from './services/sports.service';
import { UserService } from './services/user.service';
import { TvShowSearchService } from './services/tv-show-search.service';
import { DiscoverMoviesService } from './services/discover-movies.service';

// pipes
import { StripHTMLtagsPipe } from './strip-htmltags.pipe';
import { GenrePipe } from './genre.pipe';

// production mode
import { enableProdMode } from '@angular/core';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    MoviesComponent,
    ZipComponent,
    SportsComponent,
    TvmoviesComponent,
    LandingComponent,
    MenuComponent,
    StripHTMLtagsPipe,
    GenrePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EntertainmentRouter
  ],
  providers: [
    MoviesService,
    TvmoviesService,
    SportsService,
    UserService,
    TvShowSearchService,
    DiscoverMoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
