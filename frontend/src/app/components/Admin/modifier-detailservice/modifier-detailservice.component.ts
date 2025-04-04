import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../Services/service.service';
import { CategorieDeVehiculeService } from '../../../Services/categorie-de-vehicule.service';
import { ServiceDetailsService } from '../../../Services/service-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifier-detailservice',
  templateUrl: './modifier-detailservice.component.html',
  styleUrls: ['./modifier-detailservice.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ModifierServiceDetailsComponent implements OnInit {
  serviceDetailsForm!: FormGroup;
  services: any[] = [];
  categories: any[] = [];
  selectedServiceDetailId: string = '';  // ID du service détail à modifier

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private categorieDeVehiculeService: CategorieDeVehiculeService,
    private serviceDetailsService: ServiceDetailsService,
    private router: Router,
    private activatedRoute: ActivatedRoute  // Pour récupérer l'ID dans l'URL
  ) {}

  ngOnInit(): void {
    this.selectedServiceDetailId = this.activatedRoute.snapshot.paramMap.get('id') || ''; // Récupère l'ID du service détail
    this.initForm();
    this.loadServices();
    this.loadCategories();
    this.loadServiceDetail();  // Charger les détails du service existant
  }

  // Initialisation du formulaire
  initForm() {
    this.serviceDetailsForm = this.fb.group({
      service: [{ value: '', disabled: true }, Validators.required],  // Désactiver le champ Service
      categorieDeVehicule: [{ value: '', disabled: true }, Validators.required],  // Désactiver le champ Catégorie de Véhicule
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

  // Charger les détails du service à modifier
  loadServiceDetail() {
    if (!this.selectedServiceDetailId) return;

    this.serviceDetailsService.getById(this.selectedServiceDetailId).subscribe((data) => {
      // Remplir le formulaire avec les données du service à modifier
      this.serviceDetailsForm.patchValue({
        service: data.service._id,
        categorieDeVehicule: data.categorieDeVehicule._id,
      });
    });
  }

  // Modifier le service détail
  onSubmit() {
    if (this.serviceDetailsForm.invalid) {
      return;
    }
  
    // Activer les champs "service" et "categorieDeVehicule" avant la soumission
    this.serviceDetailsForm.get('service')?.enable();
    this.serviceDetailsForm.get('categorieDeVehicule')?.enable();
  
    const formData = this.serviceDetailsForm.value;
  
    // Soumettre les données de modification
    this.serviceDetailsService.update(this.selectedServiceDetailId, formData).subscribe({
      next: () => {
        alert('Service Détail modifié avec succès !');
        this.router.navigate(['admin/menu/liste-services-details']);
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Une erreur s\'est produite lors de la modification du service détail : ' + err.message);
      }
    });
  
    // Désactiver les champs "service" et "categorieDeVehicule" après la soumission
    this.serviceDetailsForm.get('service')?.disable();
    this.serviceDetailsForm.get('categorieDeVehicule')?.disable();
  }


  
}
