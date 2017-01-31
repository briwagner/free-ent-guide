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

// services
import { MoviesService } from './services/movies.service';
import { TvmoviesService } from './services/tvmovies.service';
import { SportsService } from './services/sports.service';
import { UserService } from './services/user.service';
import { TvShowSearchService } from './services/tv-show-search.service';

// development
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { DataSvcService } from './services/data-svc.service';
import { LandingComponent } from './landing/landing.component';
import { MenuComponent } from './menu/menu.component';
import { StripHTMLtagsPipe } from './strip-htmltags.pipe';


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
    StripHTMLtagsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EntertainmentRouter
    // InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'v11/movies/'})
  ],
  providers: [
    DataSvcService,
    MoviesService,
    TvmoviesService,
    SportsService,
    UserService,
    TvShowSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
