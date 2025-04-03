import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Assure-toi d'importer RouterModule ici

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [RouterModule]  // Ajout de RouterModule pour gérer le routage dans ce composant
})
export class LandingPageComponent {
  // Code de ton composant
}
