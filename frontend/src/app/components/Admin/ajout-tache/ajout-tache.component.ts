import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../Services/article.service';  // Importation du service
import { TacheService } from '../../../Services/tache.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { ServiceDetailsService } from '../../../Services/service-details.service'; 
@Component({
  selector: 'app-ajout-tache',
  templateUrl: './ajout-tache.component.html',
  styleUrls: ['./ajout-tache.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class TacheFormComponent implements OnInit {
  tacheForm!: FormGroup;
  serviceDetailsId!: string;
  articles: any[] = [];  // Variable pour stocker la liste des articles
  serviceDetails: any = null; // Objet pour stocker les détails du service
  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private articleService: ArticleService,  // Injection du service ArticleService
    private tacheService: TacheService,
    private router: Router, // Injecter Router
    private serviceDetailsService: ServiceDetailsService,
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.serviceDetailsId = params.get('id')!;
      this.getServiceDetails(this.serviceDetailsId);
    });

    // Initialisation du formulaire pour l'ajout de tâche
    this.tacheForm = this.fb.group({
      serviceDetailsId: [this.serviceDetailsId, Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      tempsEstime: ['', Validators.required],
      marge: [10],
      articlesNecessaires: this.fb.array([]) // FormArray pour ajouter les articles nécessaires
    });

    // Récupérer les articles depuis le service ArticleService
    this.articleService.getArticles().subscribe((data: any) => {
      this.articles = data;  // On stocke les articles récupérés
    });
  }
  getServiceDetails(serviceDetailsId: string): void {
    this.serviceDetailsService.getById(serviceDetailsId).subscribe(
      (data: any) => {
        this.serviceDetails = data;  // Stocke les détails du service
      },
      error => {
        console.error('Erreur lors de la récupération du service:', error);
      }
    );
  }

  articlesNecessaires(): FormArray {
    return this.tacheForm.get('articlesNecessaires') as FormArray;
  }

  addArticle() {
    this.articlesNecessaires().push(this.fb.group({
      article: ['', Validators.required],  // Valeur vide pour l'ajout d'article
      quantite: [1, Validators.required]   // Quantité initiale par défaut
    }));
  }

  removeArticle(index: number) {
    this.articlesNecessaires().removeAt(index);
  }

  onSubmit() {
    if (this.tacheForm.valid) {
      this.tacheService.addTache(this.tacheForm.value).subscribe(response => {
        console.log('Tâche ajoutée', response);
  
        // Naviguer vers la page avec serviceDetailsId après l'ajout
        this.router.navigate([`/liste-tache-services-details/${this.serviceDetailsId}`]);
      });
    }
  }
  
}
