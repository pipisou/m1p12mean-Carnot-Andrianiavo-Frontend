import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './ViewInscription.html',
  styleUrls: ['./ViewInscription.css'],
  standalone: true,
  imports: [RouterModule]
})
export class InscriptionComponent {
  constructor(private router: Router) {}

  goToInscription() {
    this.router.navigate(['/inscription']);
  }
}
