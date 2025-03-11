import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import {InscriptionComponent} from './components/Inscription/Inscription.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenu', pathMatch: 'full' },
  { path: 'bienvenu', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {path: 'inscription', component: InscriptionComponent}
];
