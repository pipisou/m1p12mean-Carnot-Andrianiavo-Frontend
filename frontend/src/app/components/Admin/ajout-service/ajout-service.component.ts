import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../Services/service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-service',
  templateUrl: './ajout-service.component.html',
  styleUrls: ['./ajout-service.component.css'],
  imports: [ 
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AjoutServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  services: any[] = []; // Liste des services ajoutés

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadServices();
  }

  // Initialisation du formulaire
  initForm() {
    this.serviceForm = this.fb.group({
      nomService: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Charger la liste des services
  loadServices() {
    this.serviceService.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  // Ajouter un service
  onSubmit() {
    if (this.serviceForm.invalid) {
      return;
    }

    const formData = this.serviceForm.value;
    this.serviceService.addService(formData).subscribe({
      next: () => {
        alert('Service ajouté avec succès !');
        this.resetForm();
        this.loadServices();
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  // Réinitialiser le formulaire après ajout
  resetForm() {
    this.serviceForm.reset();
    this.initForm();  
  }

  // Supprimer un service
  deleteService(serviceId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      this.serviceService.deleteService(serviceId).subscribe({
        next: () => {
          alert('Service supprimé avec succès !');
          this.loadServices();
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  // Ouvrir la page de modification
  editService(serviceId: string): void {
    this.router.navigate(['admin/menu/modifier-service', serviceId]);
  }
}
