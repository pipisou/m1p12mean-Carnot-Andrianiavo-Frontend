import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialiteService } from '../../../Services/specialite.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-specialite',
  templateUrl: './ajout-specialite.component.html',
  styleUrls: ['./ajout-specialite.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class AjoutSpecialiteComponent implements OnInit {
  specialiteForm!: FormGroup;
  specialites: any[] = [];

  constructor(
    private fb: FormBuilder,
    private specialiteService: SpecialiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSpecialites();
  }

  initForm() {
    this.specialiteForm = this.fb.group({
      typeSpecialite: ['', Validators.required]
    });
  }

  loadSpecialites() {
    this.specialiteService.getSpecialites().subscribe((data) => {
      this.specialites = data;
    });
  }

  onSubmit() {
    if (this.specialiteForm.invalid) {
      return;
    }

    this.specialiteService.addSpecialite(this.specialiteForm.value).subscribe({
      next: () => {
        alert('Spécialité ajoutée avec succès !');
        this.specialiteForm.reset();
        this.initForm();
        this.loadSpecialites(); // Recharger après ajout
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  editSpecialite(specialiteId: string): void {
    this.router.navigate(['/modifier-specialite', specialiteId]);
  }

  deleteSpecialite(specialiteId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette spécialité ?')) {
      this.specialiteService.deleteSpecialite(specialiteId).subscribe({
        next: () => {
          alert('Spécialité supprimée avec succès !');
          this.loadSpecialites();
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}
