import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { MoviesComponent } from './movies/movies.component';
import { TvmoviesComponent} from './tvmovies/tvmovies.component';
import { SportsComponent } from './sports/sports.component';
import { LandingComponent } from './landing/landing.component';

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
      component: TvmoviesComponent
  },
  {
      path: 'sports',
      component: SportsComponent
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