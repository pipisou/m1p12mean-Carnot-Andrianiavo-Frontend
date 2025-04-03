import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../Services/stock.service';
import { ArticleService } from '../../../Services/article.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-stock',
  templateUrl: './ajout-stock.component.html',
  styleUrls: ['./ajout-stock.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class AjoutStockComponent implements OnInit {
  stockForm!: FormGroup;
  stocks: any[] = [];
  articles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStocks();
    this.loadArticles();
  }

  initForm() {
    this.stockForm = this.fb.group({
      article: ['', Validators.required],
      quantite: ['', Validators.required],
      prixAchat: ['', Validators.required],
      prixVente: ['', Validators.required],
      fournisseur: ['', Validators.required],
      dateAchat: ['', Validators.required]
    });
  }

  loadStocks() {
    this.stockService.getStocks().subscribe((data) => {
      this.stocks = data;
    });
  }

  loadArticles() {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  onSubmit() {
    if (this.stockForm.invalid) {
      return;
    }

    this.stockService.addStock(this.stockForm.value).subscribe({
      next: () => {
        alert('Stock ajouté avec succès !');
        this.stockForm.reset();
        this.initForm();
        this.loadStocks();
      },
      error: (err) => console.error('Erreur lors de l\'ajout', err)
    });
  }

  editStock(stockId: string): void {
    this.router.navigate(['/modifier-stock', stockId]);
  }

  deleteStock(stockId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce stock ?')) {
      this.stockService.deleteStock(stockId).subscribe({
        next: () => {
          alert('Stock supprimé avec succès !');
          this.loadStocks();
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}
