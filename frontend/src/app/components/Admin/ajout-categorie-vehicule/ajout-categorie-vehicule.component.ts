import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieDeVehiculeService } from '../../../Services/categorie-de-vehicule.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-categorie-vehicule',
  templateUrl: './ajout-categorie-vehicule.component.html',
  styleUrls: ['./ajout-categorie-vehicule.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class AjoutCategorieVehiculeComponent implements OnInit {
  categorieForm!: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categorieDeVehiculeService: CategorieDeVehiculeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  initForm() {
    this.categorieForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadCategories() {
    this.categorieDeVehiculeService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    if (this.categorieForm.invalid) {
      return;
    }

    const formData = this.categorieForm.value;

    this.categorieDeVehiculeService.addCategory(formData).subscribe({
      next: () => {
        alert('Catégorie de véhicule ajoutée avec succès !');
        this.categorieForm.reset();
        this.initForm();
        this.loadCategories();
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  editCategory(categoryId: string): void {
    this.router.navigate(['/modifier-categorie-vehicule', categoryId]);
  }

  deleteCategory(categoryId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categorieDeVehiculeService.deleteCategory(categoryId).subscribe({
        next: () => {
          alert('Catégorie de véhicule supprimée avec succès !');
          this.loadCategories();
        },
        error: (err) => console.error('Erreur lors de la suppression de la catégorie', err)
      });
    }
  }
}
