import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetailsService } from '../../../Services/service-details.service';
import { TacheService } from '../../../Services/tache.service';
import { DevisService } from '../../../Services/devis.service'; // Service pour mettre à jour le devis
import { VehiculeService } from '../../../Services/vehicule.service'; // Service pour mettre à jour le devis
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Ajoute cette ligne

@Component({
  selector: 'app-modifier-devis',
  templateUrl: './modifier-devis.component.html',
  styleUrls: ['./modifier-devis.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class ModifierDevisComponent implements OnInit {
  devisId!: string;
  devis: any = {};  // Déclarez une variable pour stocker les données du devis
  categorieId!: string;  // Déclarez une variable pour stocker l'ID de la catégorie
  serviceDetails: any[] = [];  // Tableau pour stocker les détails des services
  vehicules: any[] = []; // Tableau pour stocker les véhicules
  selectedVehicule: any;  // Le véhicule sélectionné par l'utilisateur

  // Tableau pour stocker les tâches disponibles pour un service sélectionné
  taches: any[] = [];  

  // Tableau pour stocker les tâches sélectionnées (panier)
  selectedTaches: any[] = [];  

  constructor(
    private route: ActivatedRoute,
    private devisService: DevisService,
    private router: Router,
    private serviceDetailsService: ServiceDetailsService,
    private vehiculeService: VehiculeService, // Injecter le service Vehicule
    private tacheService: TacheService, // Service pour récupérer les tâches
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.devisId = params.get('id')!;
      this.getDevis(this.devisId);
    });
  }

  // Méthode pour récupérer le devis par son ID
// Méthode pour récupérer le devis par son ID
getDevis(devisId: string): void {
  this.devisService.getDevisById(devisId).subscribe(
    (data: any) => {
      this.devis = data;
      console.log(this.devis);  
      
      // Charger les tâches sélectionnées dans le devis (si elles existent)
      this.selectedTaches = data.taches || []; // Assurez-vous que les tâches sélectionnées sont bien récupérées
      
      const clientId = this.devis.client?._id;
      if (clientId) {
        this.getVehiculesByClientId(clientId);
      }
    },
    error => {
      console.error('Erreur lors de la récupération du devis:', error);
    }
  );
}


  // Méthode pour récupérer les véhicules du client
  getVehiculesByClientId(clientId: string): void {
    this.vehiculeService.getVehiculesByClientId(clientId).subscribe(
      (data: any[]) => {
        this.vehicules = data;  // Sauvegarder les véhicules du client
        if (this.vehicules.length > 0) {
          this.selectedVehicule = this.vehicules[0];
          this.getServiceDetailsByCategorie(this.selectedVehicule.categorie._id);
        }
      },
      error => {
        console.error('Erreur lors de la récupération des véhicules du client:', error);
      }
    );
  }

  // Méthode pour récupérer les détails des services par catégorie
  getServiceDetailsByCategorie(categorieId: string): void {
    this.serviceDetailsService.getByCategorieId(categorieId).subscribe(
      (data: any) => {
        this.serviceDetails = data;
        console.log(this.serviceDetails);
      },
      error => {
        console.error('Erreur lors de la récupération des détails des services:', error);
      }
    );
  }

  // Méthode pour gérer la sélection d'un véhicule
  onVehiculeSelect(): void {
    if (this.selectedVehicule) {
      this.getServiceDetailsByCategorie(this.selectedVehicule.categorie);
    }
  }

  // Méthode pour gérer la sélection d'un service
  onServiceSelect(service: any): void {
    this.serviceDetailsService.getTachesByServiceDetailsId(service._id).subscribe(
      (data: any[]) => {
        this.taches = data;  // Sauvegarder les tâches associées au service
        console.log(this.taches);
      },
      error => {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    );
  }

  // Méthode pour ajouter une tâche au panier (tâches sélectionnées)
  addToSelectedTaches(tache: any): void {
    if (!this.selectedTaches.some(item => item._id === tache._id)) {
      this.selectedTaches.push(tache);  // Ajouter la tâche au tableau des tâches sélectionnées
    }
  }

  // Méthode pour retirer une tâche du panier
  removeFromSelectedTaches(tache: any): void {
    this.selectedTaches = this.selectedTaches.filter(item => item._id !== tache._id);  // Supprimer la tâche
  }




  updateDevis(): void {
    if (!this.devisId) {
      console.error("Aucun devis sélectionné.");
      return;
    }
  
    const updatedDevis = {
      taches: this.selectedTaches.map(tache => tache._id), // Envoyer uniquement les IDs des tâches
      vehicule: this.selectedVehicule?._id // ID du véhicule sélectionné
    };
  
    this.devisService.editDevis(this.devisId, updatedDevis).subscribe(
      response => {
        console.log("Devis mis à jour avec succès :", response);

      },
      error => {
        console.error("Erreur lors de la mise à jour du devis :", error);
      }
    );
  }
  





}
