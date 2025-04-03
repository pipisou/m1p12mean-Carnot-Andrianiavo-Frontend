import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MecanicienService } from '../../../Services/mecanicien.service';
import { ServiceService } from '../../../Services/service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-ajout-mecanicien',
  templateUrl: './ajout-mecanicien.component.html',
  styleUrls: ['./ajout-mecanicien.component.css'],
  imports: [ 
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AjoutMecanicienComponent implements OnInit {
  mecanicienForm!: FormGroup;
  services: any[] = []; // Liste des services
  mecaniciens: any[] = []; // Liste des mécaniciens

  constructor(
    private fb: FormBuilder,
    private mecanicienService: MecanicienService,
    private serviceService: ServiceService, // Remplace SpecialiteService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadServices();
    this.loadMecaniciens();
  }

  initForm() {
    this.mecanicienForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      salaire: [0, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      services: this.fb.array([]), // Liste des services sélectionnés
    });
  }

  loadServices() {
    this.serviceService.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  loadMecaniciens() {
    this.mecanicienService.getMecaniciens().subscribe((data) => {
      this.mecaniciens = data;
    });
  }

  onServiceChange(event: any, serviceId: string) {
    const servicesFormArray = this.mecanicienForm.get('services') as FormArray;
    if (event.target.checked) {
      servicesFormArray.push(this.fb.control(serviceId));
    } else {
      const index = servicesFormArray.controls.findIndex(control => control.value === serviceId);
      if (index !== -1) {
        servicesFormArray.removeAt(index);
      }
    }
  }

  isServiceSelected(serviceId: string): boolean {
    const servicesFormArray = this.mecanicienForm.get('services') as FormArray;
    return servicesFormArray.controls.some(control => control.value === serviceId);
  }

  onSubmit() {
    if (this.mecanicienForm.invalid) {
      return;
    }

    const formData = this.mecanicienForm.value;

    this.mecanicienService.addMecanicien(formData).subscribe({
      next: () => {
        alert('Mécanicien ajouté avec succès !');
        this.mecanicienForm.reset();
        this.initForm();
        this.loadMecaniciens();
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  editMecanicien(mecanicienId: string): void {
    this.router.navigate(['/modifier-mecanicien', mecanicienId]);
  }

  deleteMecanicien(mecanicienId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce mécanicien ?')) {
      this.mecanicienService.deleteMecanicien(mecanicienId).subscribe({
        next: () => {
          alert('Mécanicien supprimé avec succès !');
          this.loadMecaniciens();
        },
        error: (err) => console.error('Erreur lors de la suppression du mécanicien', err)
      });
    }
  }
}
