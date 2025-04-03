import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceDetailsService } from '../../../Services/service-details.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-liste-service-details',
  templateUrl: './liste-service-details.component.html',
  styleUrls: ['./liste-service-details.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ServiceDetailsComponent implements OnInit {
  serviceDetails: any[] = []; // Stocke les détails des services
  hasFixedServices: boolean = false;
  hasVariableServices: boolean = false;

  constructor(
    private serviceDetailsService: ServiceDetailsService,
    private router: Router // Injecter Router
  ) {}


  ngOnInit(): void {
    this.loadServiceDetails();
  }

  // Charger les détails des services
  loadServiceDetails(): void {
    this.serviceDetailsService.getAll().subscribe({
      next: (data) => {
        this.serviceDetails = data;
console.log(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails des services', err);
      }
    });
  }


  onEdit(serviceId: string): void {
    this.router.navigate(['/modifier-services-details', serviceId]); // Redirige vers la page de modification avec l'ID
  }

  // Méthode de suppression
  onDelete(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce détail de service ?')) {
      this.serviceDetailsService.delete(id).subscribe({
        next: () => {
          this.serviceDetails = this.serviceDetails.filter(detail => detail._id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }
  onManageTasks(detailId: string) {
    this.router.navigate([`/liste-tache-services-details/${detailId}`]);
  }
  onAdd() {
    this.router.navigate([`/services-details`]);
  }
  onManageQuotes(detailId: string) {
    this.router.navigate([`/liste-devis/${detailId}`]);
    // Ajoutez ici la logique pour gérer les devis liés au détail de service
  }
  
}
