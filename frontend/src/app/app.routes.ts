import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import {InscriptionComponent} from './components/Inscription/Inscription.component';
import {ClientHomeComponent} from './components/Client/Acceuil/ClientHome.Component';
import {HomePageComponent} from './components/Client/home-page/home-page.component';
import {DeviComponent} from './components/Client/devi/devi.component';
import {CommandeComponent} from './components/Client/commande/commande.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenu', pathMatch: 'full' },
  { path: 'bienvenu', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {path: 'inscription', component: InscriptionComponent},
  {
    path: 'client',
    component: ClientHomeComponent,
    children: [
      {path: 'devi', component: DeviComponent},
      {path: 'service', component: CommandeComponent},
      {path: 'home', component: HomePageComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
];
