import { Component, OnInit } from '@angular/core';
import { CategorieDeVehiculeService } from '../../../Services/categorie-de-vehicule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-categorie-vehicule',
  templateUrl: './edit-categorie-vehicule.component.html',
  styleUrls: ['./edit-categorie-vehicule.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,  // ✅ Importer ReactiveFormsModule
    RouterModule
  ]
})
export class EditCategorieVehiculeComponent implements OnInit {
  categorieForm!: FormGroup;
  categorieId: string = '';

  constructor(
    private fb: FormBuilder,
    private categorieDeVehiculeService: CategorieDeVehiculeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la catégorie de véhicule à partir des paramètres de l'URL
    this.route.paramMap.subscribe((params) => {
      this.categorieId = params.get('id')!;
      this.categorieDeVehiculeService.getCategoryById(this.categorieId).subscribe((data: any) => {
        // Initialiser les valeurs du formulaire avec les données existantes
        this.categorieForm.patchValue({ nom: data.nom, description: data.description });
      });
    });

    // Initialiser le formulaire réactif
    this.categorieForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Mise à jour de la catégorie de véhicule
  updateCategory(): void {
    if (this.categorieForm.invalid) {
      return;
    }

    this.categorieDeVehiculeService.editCategory(this.categorieId, this.categorieForm.value)
      .subscribe(() => {
        alert('Catégorie de véhicule mise à jour avec succès !');
        this.router.navigate(['/categories-vehicules']);
      });
  }
}
