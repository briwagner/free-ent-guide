import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { MoviesComponent } from './movies/movies.component';
import { TvmoviesComponent} from './tvmovies/tvmovies.component';
import { MoviesOnTvComponent} from './movies-on-tv/movies-on-tv.component';
import { SportsComponent } from './sports/sports.component';
import { SearchComponent } from './search/search.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'cinema',
    component: MoviesComponent
  },
  {
    path: 'television',
    component: TvmoviesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'movies',
        component: MoviesOnTvComponent
      },
      {
        path: 'sports',
        component: SportsComponent
      }, {
        path: 'search',
        component: SearchComponent
      }
    ]
  },
  {
    path: '**',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class EntertainmentRouter { }