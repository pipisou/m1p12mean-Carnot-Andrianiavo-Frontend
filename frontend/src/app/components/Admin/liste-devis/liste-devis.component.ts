import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevisService } from '../../../Services/devis.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-liste-devis',
  templateUrl: './liste-devis.component.html',
  styleUrls: ['./liste-devis.component.css'],
  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ListeDevisComponent implements OnInit {
  devis: any[] = [];  // Tableau pour stocker les devis récupérés
  serviceDetailsId: string = '';  // Variable pour stocker l'ID du serviceDetails

  constructor(
    private route: ActivatedRoute,
    private devisService: DevisService,
    private router: Router  // Injection du Router pour la navigation
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du serviceDetails à partir de l'URL en utilisant paramMap
    this.route.paramMap.subscribe((params) => {
      this.serviceDetailsId = params.get('id') || '';  // Récupérer l'ID du serviceDetails
  
      // Si un serviceDetailsId est trouvé, charger les devis associés
      if (this.serviceDetailsId) {
        this.loadDevis();  // Charger les devis pour ce serviceDetails
      }
    });
  }
  calculateTotalPrice(taches: any[]): number {
    return taches.reduce((total, tache) => total + tache.prix, 0);
  }

  // Méthode pour calculer le temps total Estimé + Marge de toutes les tâches
  calculateTotalTime(taches: any[]): number {
    return taches.reduce((total, tache) => total + tache.tempsEstime + tache.marge, 0);
  }

  loadDevis(): void {
    // Appeler le service pour récupérer les devis en fonction du serviceDetailsId
    this.devisService.getDevisByServiceDetailsAndNoClient(this.serviceDetailsId).subscribe(
      (data) => {
        this.devis = data;  // Stocker les devis dans la variable devis
      },
      (error) => {
        console.error('Erreur lors de la récupération des devis:', error);
      }
    );
  }
    // Méthode pour supprimer un devis
    deleteDevis(devisId: string): void {
      // Appel du service pour supprimer le devis
      this.devisService.deleteDevis(devisId).subscribe(
        () => {
          // Supprimer le devis localement de la liste après la suppression
          this.devis = this.devis.filter(devis => devis._id !== devisId);
        },
        (error) => {
          console.error('Erreur lors de la suppression du devis:', error);
        }
      );
    }
      // Méthode pour modifier un devis
  editDevis(devisId: string): void {
    // Navigation vers le composant de modification du devis en utilisant l'ID du devis
    this.router.navigate([`/modifier-devis/${devisId}`]);
  }

  onAddDevis(): void {
    this.router.navigate([`/ajout-devis/${this.serviceDetailsId}`]);  // Remplacer par le bon chemin
  }
}
