import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../Services/service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class EditServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  serviceId!: string;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadService();
  }

  // Initialisation du formulaire
  initForm() {
    this.serviceForm = this.fb.group({
      nomService: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Charger les détails du service à modifier
  loadService() {
    this.serviceService.getServiceById(this.serviceId).subscribe({
      next: (service) => {
        this.serviceForm.patchValue({
          nomService: service.nomService,
          description: service.description
        });
      },
      error: (err) => console.error('Erreur lors du chargement du service', err)
    });
  }

  // Soumettre le formulaire de modification
  onSubmit() {
    if (this.serviceForm.invalid) {
      return;
    }
    const formData = this.serviceForm.value;
    this.serviceService.updateService(this.serviceId, formData).subscribe({
      next: () => {
        alert('Service modifié avec succès !');
        this.router.navigate(['/services']);
      },
      error: (err) => console.error('Erreur lors de la modification', err)
    });
  }
}
