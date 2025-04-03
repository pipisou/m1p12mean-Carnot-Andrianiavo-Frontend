import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../Services/stock.service';
import { ArticleService } from '../../../Services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ Importer ReactiveFormsModule
    RouterModule
  ]
})
export class EditStockComponent implements OnInit {
  stockForm!: FormGroup;
  stockId: string = '';
  articles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      article: ['', Validators.required],
      quantite: ['', Validators.required],
      prixAchat: ['', Validators.required],
      prixVente: ['', Validators.required],
      fournisseur: ['', Validators.required],
      dateAchat: ['', Validators.required]
    });

    this.route.paramMap.subscribe((params) => {
      this.stockId = params.get('id')!;
      this.loadStockData();
    });

    this.loadArticles();
  }

  loadStockData() {
    this.stockService.getStockById(this.stockId).subscribe((stock: any) => {
      if (stock) {
        this.stockForm.patchValue({
          article: stock.article._id,
          quantite: stock.quantite,
          prixAchat: stock.prixAchat,
          prixVente: stock.prixVente,
          fournisseur: stock.fournisseur,
          dateAchat: stock.dateAchat.split('T')[0]
        });
      }
    });
  }

  loadArticles() {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  updateStock(): void {
    if (this.stockForm.invalid) {
      return;
    }

    this.stockService.updateStock(this.stockId, this.stockForm.value).subscribe(() => {
      alert('Stock mis à jour avec succès !');
      this.router.navigate(['/stocks']);
    });
  }
}
