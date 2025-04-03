import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../Services/article.service';
import { CategorieService } from '../../../Services/categorie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.component.html',
  styleUrls: ['./ajout-article.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class AjoutArticleComponent implements OnInit {
  articleForm!: FormGroup;
  categories: any[] = [];
  articles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadArticles();
  }

  initForm() {
    this.articleForm = this.fb.group({
      nomArticle: ['', Validators.required],
      categorie: ['', Validators.required]
    });
  }

  loadCategories() {
    this.categorieService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadArticles() {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  onSubmit() {
    if (this.articleForm.invalid) {
      return;
    }

    const formData = this.articleForm.value;

    this.articleService.addArticle(formData.nomArticle, formData.categorie).subscribe({
      next: () => {
        alert('Article ajouté avec succès !');
        this.articleForm.reset();
        this.initForm();
        this.loadArticles(); // Recharger les articles après ajout
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  editArticle(articleId: string): void {
    this.router.navigate(['/modifier-article', articleId]);
  }

  deleteArticle(articleId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.deleteArticle(articleId).subscribe({
        next: () => {
          alert('Article supprimé avec succès !');
          this.loadArticles(); // Recharger les articles après suppression
        },
        error: (err) => console.error('Erreur lors de la suppression de l\'article', err)
      });
    }
  }
}
