import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component'; // Assurez-vous d'importer le bon composant
import { ArticleComponent } from './components/article/article.component'; // Assurez-vous d'importer le bon composant

export const routes: Routes = [
  { path: '', redirectTo: 'Bienvenu', pathMatch: 'full' },
  { path: 'Bienvenu', component: LandingPageComponent },
  { path: 'login', component: LoginComponent }, // Route de connexion
  { path: 'article', component: ArticleComponent },
];
