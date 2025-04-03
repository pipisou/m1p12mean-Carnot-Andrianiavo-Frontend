import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MecanicienService } from '../../../Services/mecanicien.service';
import { ServiceService } from '../../../Services/service.service'; // Remplace SpecialiteService
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifier-mecanicien',
  templateUrl: './modifier-mecanicien.component.html',
  styleUrls: ['./modifier-mecanicien.component.css'],
  imports: [ 
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ModifierMecanicienComponent implements OnInit {
  mecanicienForm!: FormGroup;
  services: any[] = [];  // Remplace specialites
  mecanicienId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private mecanicienService: MecanicienService,
    private serviceGarageService: ServiceService // Remplace SpecialiteService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadServices();
    this.loadMecanicien();
  }

  // Initialisation du formulaire
  initForm() {
    this.mecanicienForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      salaire: [0, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      services: this.fb.array([]) // FormArray pour les services
    });
  }

  // Charger tous les services disponibles
  loadServices() {
    this.serviceGarageService.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  // Charger les informations du mécanicien pour la modification
  loadMecanicien() {
    this.mecanicienId = this.route.snapshot.paramMap.get('id')!;  // Récupérer l'ID du mécanicien depuis l'URL
    this.mecanicienService.getMecanicienById(this.mecanicienId).subscribe((data) => {
      // Charger les informations du mécanicien dans le formulaire
      this.mecanicienForm.patchValue({
        nom: data.nom,
        prenom: data.prenom,
        salaire: data.salaire,
        email: data.email,
        telephone: data.telephone,
        motDePasse: data.motDePasse
      });

      // Ajouter les services existants dans le FormArray
      this.setServices(data.services);  // `data.services` doit être une liste des services du mécanicien
    });
  }

  // Mettre à jour le FormArray des services
  setServices(services: any[]) {
    const servicesFormArray = this.mecanicienForm.get('services') as FormArray;
    servicesFormArray.clear();  // Effacer toutes les entrées actuelles
  
    // Ajouter uniquement les IDs des services sélectionnés
    services.forEach((service) => {
      if (service) {
        servicesFormArray.push(this.fb.control(service._id));  // Ajouter l'ID du service
      }
    });
  }
  
  // Méthode pour gérer le changement des services (coché ou décoché)
  onServiceChange(event: any, serviceId: string) {
    const servicesFormArray = this.mecanicienForm.get('services') as FormArray;
  
    if (event.target.checked) {
      // Ajouter l'ID du service dans le tableau si la case est cochée
      servicesFormArray.push(new FormControl(serviceId));
    } else {
      // Retirer l'ID du service si la case est décochée
      const index = servicesFormArray.controls.findIndex(control => control.value === serviceId);
      if (index !== -1) {
        servicesFormArray.removeAt(index);
      }
    }
  }
  
  // Soumettre le formulaire
  onSubmit() {
    if (this.mecanicienForm.invalid) {
      return;
    }
  
    // Récupérer uniquement les IDs des services sélectionnés
    const selectedServices = this.mecanicienForm.get('services')?.value || [];
  
    // Créer l'objet à envoyer
    const formData = {
      ...this.mecanicienForm.value,
      services: selectedServices // Envoyer uniquement les IDs des services
    };
  
    formData._id = this.mecanicienId;  // Ajouter l'ID du mécanicien pour la mise à jour
  
    this.mecanicienService.updateMecanicien(this.mecanicienId, formData).subscribe({
      next: () => {
        alert('Mécanicien mis à jour avec succès !');
      },
      error: (err) => console.error('Erreur lors de la mise à jour', err)
    });
  }
}
