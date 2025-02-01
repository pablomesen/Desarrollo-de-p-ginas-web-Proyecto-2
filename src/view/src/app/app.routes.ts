import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ActorCatalogComponent } from './actors/actor-catalog/actor-catalog.component';
import { ActorDetailComponent } from './actors/actor-details/actor-details.component';
import { MovieFormComponent } from './forms/movie-form/movie-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'actors', component: ActorCatalogComponent }, 
  { path: 'actors/:id', component: ActorDetailComponent }, 
  {path: 'movie-form', component: MovieFormComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
