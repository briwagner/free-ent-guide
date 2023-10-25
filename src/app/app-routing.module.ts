import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { TvmoviesComponent} from './tvmovies/tvmovies.component';
import { MoviesOnTvComponent} from './movies-on-tv/movies-on-tv.component';
import { SportsComponent } from './sports/sports.component';
import { SearchComponent } from './search/search.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './user/auth.guard';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { NhlgamesComponent } from './nhlgames/nhlgames.component';

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
    canActivate: [AuthGuard]
  },
  {
    path: 'television/movies',
    component: MoviesOnTvComponent,
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