// edit-categorie.component.ts
import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../../Services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ Importer ReactiveFormsModule
    RouterModule
  ]
})
export class EditCategorieComponent implements OnInit {
  categorieForm!: FormGroup;
  categorieId: string = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categorieId = params.get('id')!;
      this.categoryService.getCategoryById(this.categorieId).subscribe((data: any) => {
        this.categorieForm.patchValue({ nomCategorie: data.nomCategorie });
      });
    });

    this.categorieForm = this.fb.group({
      nomCategorie: ['', Validators.required]
    });
  }

  updateCategory(): void {
    if (this.categorieForm.invalid) {
      return;
    }

    this.categoryService.updateCategory(this.categorieId, this.categorieForm.value.nomCategorie)
      .subscribe(() => {
        alert('Catégorie mise à jour avec succès !');
        this.router.navigate(['/categories']);
      });
  }
}
