import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [RouterModule, FormsModule]
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  constructor(private apiService: ApiService) {}
  onSubmit() {
    console.log("Données du formulaire :", this.user);
    this.apiService.login(this.user).subscribe(
      response => {
        console.log('Réponse de l\'API:', response);
        // Traiter la réponse ici (ex. rediriger l'utilisateur)
      },
      error => {
        console.error('Erreur API:', error);
        // Traiter l'erreur ici (ex. afficher un message d'erreur)
      }
    );
  }
}
