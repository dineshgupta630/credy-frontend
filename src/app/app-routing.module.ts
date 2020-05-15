import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {LogoutComponent} from "./auth/logout/logout.component";
import { RegistrationComponent } from './auth/registration/registration.component';
import {HomepageComponent} from "./layouts/homepage/homepage.component";
import {AuthGuard} from "./services/auth.services";
import { MovieDetailedComponent} from "./layouts/movie-detailed/movie-detailed.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'movie/:slug', component: MovieDetailedComponent,  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
