import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from '../../../Services/tache.service';
import { ArticleService } from '../../../Services/article.service';  // Ajout du service ArticleService
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifier-taches',
  templateUrl: './modifier-taches.component.html',
  styleUrls: ['./modifier-taches.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class ModifierTachesComponent implements OnInit {
  tacheId!: string;  // ID de la tâche à modifier
  tacheForm!: FormGroup;  // Formulaire de modification de la tâche
  tache: any = {};  // Détails de la tâche à modifier
  articles: any[] = []; // Liste des articles disponibles

  constructor(
    private route: ActivatedRoute,
    private tacheService: TacheService,
    private articleService: ArticleService,  // Service ArticleService ajouté
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la tâche depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.tacheId = params.get('id')!;  // Récupère l'ID de la tâche
      this.getTacheForEdit(this.tacheId);  // Appelle la fonction pour récupérer les détails de la tâche
    });

    // Charger tous les articles disponibles
    this.articleService.getArticles().subscribe((data: any) => {
      this.articles = data;  // On stocke les articles récupérés
    });

    // Initialiser le formulaire
    this.tacheForm = this.fb.group({
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      tempsEstime: ['', [Validators.required, Validators.min(0)]],
      marge: ['', [Validators.required, Validators.min(0)]],
      articlesNecessaires: this.fb.array([])  // FormArray pour les articles nécessaires
    });
  }

  // Récupérer les détails de la tâche pour l'édition
  getTacheForEdit(tacheId: string): void {
    this.tacheService.getTacheById(tacheId).subscribe(
      (data: any) => {
        this.tache = data;  // Stocke les données de la tâche
        this.populateForm();  // Remplir le formulaire avec les données de la tâche
      },
      error => {
        console.error('Erreur lors de la récupération de la tâche:', error);
      }
    );
  }

  // Remplir le formulaire avec les données de la tâche
  populateForm(): void {
    this.tacheForm.patchValue({
      description: this.tache.description,
      prix: this.tache.prix,
      tempsEstime: this.tache.tempsEstime,
      marge: this.tache.marge
    });

    // Si des articles existent, on les ajoute dans le FormArray
    if (this.tache.articlesNecessaires) {
      const articlesControl = this.tacheForm.get('articlesNecessaires') as FormArray;
      this.tache.articlesNecessaires.forEach((articleNecessaire: any) => {
        articlesControl.push(this.fb.group({
          article: [articleNecessaire.article._id, Validators.required],  // Utilisation de _id de l'article imbriqué
          quantite: [articleNecessaire.quantite, Validators.required]
        }));
      });
    }
    
    
  }

  // Soumettre le formulaire de modification de la tâche
  onSubmit(): void {
    if (this.tacheForm.invalid) {
      return;  // Si le formulaire est invalide, ne pas soumettre
    }

    const updatedTache = this.tacheForm.value;
    this.tacheService.editTache(this.tacheId, updatedTache).subscribe(
      () => {
        console.log('Tâche modifiée avec succès');
        this.router.navigate([`/liste-tache-services-details/${this.tache.serviceDetails._id}`]);  // Rediriger vers la liste des tâches après modification
      },
      error => {
        console.error('Erreur lors de la modification de la tâche:', error);
      }
    );
  }

  // Récupérer le FormArray pour les articles nécessaires
  articlesNecessaires(): FormArray {
    return this.tacheForm.get('articlesNecessaires') as FormArray;
  }

  // Ajouter un article à la liste des articles nécessaires
  addArticle(): void {
    this.articlesNecessaires().push(this.fb.group({
      article: ['', Validators.required],  // Valeur vide pour l'ajout d'article
      quantite: ['', Validators.required]   // Quantité initiale par défaut
    }));
  }

  // Supprimer un article de la liste
  removeArticle(index: number): void {
    this.articlesNecessaires().removeAt(index);
  }
}
