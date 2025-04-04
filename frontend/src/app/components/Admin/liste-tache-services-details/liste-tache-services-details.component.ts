import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetailsService } from '../../../Services/service-details.service';  // Assurez-vous que le service ServiceDetailsService est importé
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TacheService } from '../../../Services/tache.service';
@Component({
  selector: 'app-liste-tache-services-details',
  templateUrl: './liste-tache-services-details.component.html',
  styleUrls: ['./liste-tache-services-details.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ListeTacheServicesDetailsComponent implements OnInit {
  serviceDetailsId!: string;  // ID du service details
  taches: any[] = [];  // Tableau pour stocker les tâches
  serviceDetails: any = null; // Objet pour stocker les détails du service
  constructor(
    private route: ActivatedRoute,
    private serviceDetailsService: ServiceDetailsService,
    private tacheService: TacheService,  // Injection du service TacheService
    private router: Router  // Injection du Router pour la navigation
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du service depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.serviceDetailsId = params.get('id')!;  
      this.getServiceDetails(this.serviceDetailsId);// Récupère l'ID du service à partir de la route
      this.getTachesForServiceDetails(this.serviceDetailsId);  // Appelle la fonction pour récupérer les tâches
    });
  }
  getServiceDetails(serviceDetailsId: string): void {
    this.serviceDetailsService.getById(serviceDetailsId).subscribe(
      (data: any) => {
        this.serviceDetails = data;  // Stocke les détails du service
      },
      error => {
        console.error('Erreur lors de la récupération du service:', error);
      }
    );
  }

  // Récupérer les tâches associées au serviceDetailsId
  getTachesForServiceDetails(serviceDetailsId: string): void {
    this.serviceDetailsService.getTachesByServiceDetailsId(serviceDetailsId).subscribe(
      (data: any) => {
        this.taches = data;  // Stocke les tâches récupérées
      },
      error => {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    );
  }
  onAddTask(): void {
    this.router.navigate([ `admin/menu/tache-services-details/${this.serviceDetailsId}` ]); 

  }
  
    // Méthode pour éditer une tâche
    onEdit(tacheId: string): void {
      console.log('Modifier la tâche avec l\'ID:', tacheId);
      this.router.navigate(['admin/menu/modifier-taches', tacheId]); 
    }
  
    onDelete(tacheId: string): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        this.tacheService.deleteTache(tacheId).subscribe(
          () => {
            this.taches = this.taches.filter(tache => tache._id !== tacheId);  // Retirer la tâche supprimée du tableau
            console.log('Tâche supprimée avec succès');
          },
          error => {
            console.error('Erreur lors de la suppression de la tâche:', error);
          }
        );
      }
    }
}
