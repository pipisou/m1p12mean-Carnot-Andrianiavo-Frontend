import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importation nécessaire pour le routage
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule],  // Assurez-vous que RouterModule est dans les imports
})
export class AppComponent {
  title = 'frontend';
}
