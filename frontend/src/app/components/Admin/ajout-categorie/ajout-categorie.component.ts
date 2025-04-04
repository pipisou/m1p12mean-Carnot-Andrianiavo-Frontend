// ajout-categorie.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../../../Services/categorie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class AjoutCategorieComponent implements OnInit {
  categorieForm!: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  initForm() {
    this.categorieForm = this.fb.group({
      nomCategorie: ['', Validators.required]
    });
  }

  loadCategories() {
    this.categorieService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    if (this.categorieForm.invalid) {
      return;
    }

    const formData = this.categorieForm.value;

    this.categorieService.addCategory(formData.nomCategorie).subscribe({
      next: () => {
        alert('Catégorie ajoutée avec succès !');
        this.categorieForm.reset();
        this.initForm();
        this.loadCategories();
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  editCategory(categoryId: string): void {
    this.router.navigate(['admin/menu/modifier-categorie', categoryId]);
  }

  deleteCategory(categoryId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categorieService.deleteCategory(categoryId).subscribe({
        next: () => {
          alert('Catégorie supprimée avec succès !');
          this.loadCategories();
        },
        error: (err) => console.error('Erreur lors de la suppression de la catégorie', err)
      });
    }
  }
}
