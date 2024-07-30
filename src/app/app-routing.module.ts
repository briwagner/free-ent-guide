import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './user/auth.guard';
import { AddGamesComponent } from './add-games/add-games.component';
import { LandingComponent } from './landing/landing.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesOnTvComponent} from './movies-on-tv/movies-on-tv.component';
import { NhlgamesComponent } from './nhlgames/nhlgames.component';
import { SearchComponent } from './search/search.component';
import { SportsComponent } from './sports/sports.component';
import { TvmoviesComponent} from './tvmovies/tvmovies.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserAccountComponent } from './user-account/user-account.component';

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
    component: MoviesOnTvComponent,
  },
  {
    path: 'television/movies',
    component: MoviesOnTvComponent,
  },
  {
    path: 'television/show/:id',
    component: TvShowComponent,
  },
  {
    path: 'television/sports',
    component: SportsComponent
  },
  {
    path: 'television/sports/nhl',
    component: NhlgamesComponent
  },
  {
    path: 'television/search',
    component: SearchComponent
  },
  {
    path: 'user',
    component: UserLandingComponent
  },
  {
    path: 'user/new',
    component: UserCreateComponent
  },
  {
    path: 'user/login',
    component: UserLoginComponent
  },
  {
    path:'user/logout',
    component: UserLogoutComponent
  },
  {
    path: 'user/account',
    component: UserAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/add-games',
    component: AddGamesComponent,
    canActivate: [AuthGuard]
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