import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MoviesComponent } from './movies/movies.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { DataSvcService } from './services/data-svc.service';
import { MoviesService } from './services/movies.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'v11/movies/'})
  ],
  providers: [
    DataSvcService,
    MoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
