import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../Services/article.service';
import { CategorieService } from '../../../Services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class EditArticleComponent implements OnInit {
  articleForm!: FormGroup;
  categories: any[] = [];
  articleId: string = '';

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.articleId = params.get('id')!;
      this.articleService.getArticleById(this.articleId).subscribe((data: any) => {
        this.articleForm.patchValue({
          nomArticle: data.nomArticle,
          categorie: data.categorie._id
        });
      });
    });

    this.initForm();
    this.loadCategories();
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

  updateArticle() {
    if (this.articleForm.invalid) {
      return;
    }

    this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe(() => {
      alert('Article mis à jour avec succès !');
      this.router.navigate(['admin/menu/articles']);
    });
  }
}
