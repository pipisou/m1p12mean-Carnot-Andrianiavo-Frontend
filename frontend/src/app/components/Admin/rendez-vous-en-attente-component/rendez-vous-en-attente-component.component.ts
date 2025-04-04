import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-rendez-vous-en-attente-component',
  templateUrl: './rendez-vous-en-attente-component.component.html',
  styleUrls: ['./rendez-vous-en-attente-component.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class RendezVousEnAttenteComponent implements OnInit {
  rendezVousEnAttente: any[] = [];

  constructor(private rendezVousService: RendezVousService,  private router: Router) {
    
  }

  ngOnInit(): void {
    this.loadRendezVousEnAttente();
  }

  loadRendezVousEnAttente(): void {
    this.rendezVousService.getRendezVousEnAttente().subscribe({
      next: (data) => {
        this.rendezVousEnAttente = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des rendez-vous en attente :', error);
      }
    });
  }

  choisirDate(id: string): void {
    this.router.navigate(['admin/menu/choisirDate', id]);
  }
  
}
