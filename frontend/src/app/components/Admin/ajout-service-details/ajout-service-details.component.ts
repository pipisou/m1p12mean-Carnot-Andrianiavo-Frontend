import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../Services/service.service';
import { CategorieDeVehiculeService } from '../../../Services/categorie-de-vehicule.service';
import { ServiceDetailsService } from '../../../Services/service-details.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-service-details',
  templateUrl: './ajout-service-details.component.html',
  styleUrls: ['./ajout-service-details.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AjoutServiceDetailsComponent implements OnInit {
  serviceDetailsForm!: FormGroup;
  services: any[] = [];
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private categorieDeVehiculeService: CategorieDeVehiculeService,
    private serviceDetailsService: ServiceDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadServices();
    this.loadCategories();
  }

  // Initialisation du formulaire
  initForm() {
    this.serviceDetailsForm = this.fb.group({
      service: ['', Validators.required],
      categorieDeVehicule: ['', Validators.required]
    });
  }

  // Charger la liste des services
  loadServices() {
    this.serviceService.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  // Charger la liste des catégories de véhicule
  loadCategories() {
    this.categorieDeVehiculeService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Ajouter un service détail
  onSubmit() {
    if (this.serviceDetailsForm.invalid) {
      return;
    }
    const formData = this.serviceDetailsForm.value;
    
    this.serviceDetailsService.create(formData).subscribe({
      next: () => {
        alert('Service Détails ajouté avec succès !');
        this.router.navigate(['/liste-services-details']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout', err);
        alert('Une erreur s\'est produite lors de l\'ajout du service détail : ' + err.message);
      }
    });
  }
}