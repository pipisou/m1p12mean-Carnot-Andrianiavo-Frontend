import { Component, OnInit } from '@angular/core';
import { BeneficeService } from '../../../Services/benefice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import pour ngModel
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-benefice-annuel',
  templateUrl: './benefice-annuel.component.html',
  styleUrls: ['./benefice-annuel.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule  // Ajout ici
  ]
})
export class BeneficeAnnuelComponent implements OnInit {
  annee: number = new Date().getFullYear(); // Valeur par défaut : année en cours
  beneficeAnnuel: any[] = [];
  loading: boolean = false;
  constructor(
    private beneficeService: BeneficeService,    
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerBeneficeAnnuel();
  }

  chargerBeneficeAnnuel(): void {
    this.loading = true;
    console.log("Chargement des données pour l'année :", this.annee);

    this.beneficeService.getBeneficeAnnuel(this.annee).subscribe(
      (data) => {
        this.beneficeAnnuel = data; // Tableau des mois avec leurs valeurs
        console.log(this.beneficeAnnuel);
        this.loading = false; // Fin du chargement
      },
      (error) => {
        console.error('Erreur lors du chargement des données', error);
        this.loading = false; // Fin du chargement
      }
    );
  }

  voirDetails(mois: string): void {
    this.router.navigate([`admin/menu/benefice-mois/${this.annee}/${mois}`]);
  }
}
