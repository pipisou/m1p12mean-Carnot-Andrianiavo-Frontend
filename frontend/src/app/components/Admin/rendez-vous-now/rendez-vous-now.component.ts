import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Router} from '@angular/router';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule

@Component({
  selector: 'app-rendez-vous-now',
  templateUrl: './rendez-vous-now.component.html',
  styleUrls: ['./rendez-vous-now.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule,FormsModule]
})
export class RendezVousNowComponent implements OnInit {

  rendezVousPresents: any[] = []; // Liste des rendez-vous présents
  rendezVousAbsents: any[] = [];  // Liste des rendez-vous absents

  // Injection du service RendezVousService dans le constructeur
  constructor(private rendezVousService: RendezVousService,   private router: Router  ) {}

  ngOnInit(): void {
    this.chargerRendezVousPresents(); // Charger les rendez-vous présents lors de l'initialisation
    this.chargerRendezVousAbsents();  // Charger les rendez-vous absents lors de l'initialisation
  }

  // Charger les rendez-vous marqués comme "Présent"
  chargerRendezVousPresents(): void {
    this.rendezVousService.getRendezVousPresents().subscribe(data => {
      this.rendezVousPresents = data;  // Affecter les rendez-vous présents à la variable
    });
  }

  // Charger les rendez-vous marqués comme "Absent"
  chargerRendezVousAbsents(): void {
    this.rendezVousService.getRendezVousAbsents().subscribe(data => {
      this.rendezVousAbsents = data;  // Affecter les rendez-vous absents à la variable
    });
  }
  downloadFacture(id: string): void {
    this.rendezVousService.generateFacture(id).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  
  

    // Fonction pour rediriger vers la page de gestion du rendez-vous
    voirDetailsRendezVous(rdvId: string): void {
      this.router.navigate(['/rendezvous', rdvId]);  // Redirige vers /rendezvous/:id
    }
}
