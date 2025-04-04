import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetailsService } from '../../../Services/service-details.service';
import { Router } from '@angular/router';
import { TacheService } from '../../../Services/tache.service';
import { DevisService } from '../../../Services/devis.service'; // Service pour enregistrer le devis
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Ajoute cette ligne
@Component({
  selector: 'app-ajout-devis.component',
  templateUrl: './ajout-devis.component.html',
  styleUrls: ['./ajout-devis.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule,FormsModule]
})
export class AjoutDevisComponent implements OnInit {
  serviceDetailsId!: string;
  tachesDisponibles: any[] = [];  // Liste des tâches disponibles
  tachesSelectionnees: any[] = [];  // Liste des tâches sélectionnées
  serviceDetails: any = null;
  description!: string;
  constructor(
    private route: ActivatedRoute,
    private serviceDetailsService: ServiceDetailsService,
    private tacheService: TacheService,
    private devisService: DevisService, // Service pour envoyer le devis
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.serviceDetailsId = params.get('id')!;
      this.getServiceDetails(this.serviceDetailsId);
      this.getTachesForServiceDetails(this.serviceDetailsId);
    });
  }

  getServiceDetails(serviceDetailsId: string): void {
    this.serviceDetailsService.getById(serviceDetailsId).subscribe(
      (data: any) => {
        this.serviceDetails = data;
      },
      error => console.error('Erreur lors de la récupération du service:', error)
    );
  }

  getTachesForServiceDetails(serviceDetailsId: string): void {
    this.serviceDetailsService.getTachesByServiceDetailsId(serviceDetailsId).subscribe(
      (data: any) => {
        this.tachesDisponibles = data;
      },
      error => console.error('Erreur lors de la récupération des tâches:', error)
    );
  }

  // Ajouter une tâche au panier
  ajouterTache(tache: any): void {
    this.tachesSelectionnees.push(tache);
    this.tachesDisponibles = this.tachesDisponibles.filter(t => t._id !== tache._id);
  }

  // Retirer une tâche du panier
  retirerTache(tache: any): void {
    this.tachesDisponibles.push(tache);
    this.tachesSelectionnees = this.tachesSelectionnees.filter(t => t._id !== tache._id);
  }
  getTotalPrix(): number {
    return this.tachesSelectionnees.reduce((total, tache) => total + tache.prix, 0);
  }
  
  getTotalDuree(): number {
    return this.tachesSelectionnees.reduce((total, tache) => total + tache.tempsEstime + tache.marge, 0);
  }
  
  // Enregistrer le devis
  creerDevis(): void {
    if (this.tachesSelectionnees.length === 0) {
      alert("Veuillez sélectionner au moins une tâche pour créer un devis.");
      return;
    }

    const devisData = {
      serviceDetails: this.serviceDetailsId,
      description:this.description,
      taches: this.tachesSelectionnees.map(t => t._id)
    };

    this.devisService.addDevis(devisData).subscribe(
      (response: any) => {
        alert("Devis créé avec succès !");
        this.router.navigate([`/liste-devis/${this.serviceDetailsId}`]);
      },
      error => console.error("Erreur lors de la création du devis :", error)
    );
  }
}
