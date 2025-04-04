import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficeService } from '../../../Services/benefice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-benefice-mois',
  templateUrl: './benefice-mois.component.html',
  styleUrls: ['./benefice-mois.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class BeneficeMoisComponent implements OnInit {
  annee: number = 0;
  mois: number = 0;
  details: any = null;

  constructor(
    private route: ActivatedRoute,
    private beneficeService: BeneficeService
  ) {}

  ngOnInit(): void {
    const moisAnnee = this.route.snapshot.paramMap.get('mois') || "";
    const [moisStr, anneeStr] = moisAnnee.split("-");
  
    this.mois = parseInt(moisStr, 10); // "01" → 1
    this.annee = parseInt(anneeStr, 10); // "2025" → 2025
  
    console.log("Mois:", this.mois, "Année:", this.annee); // Vérification
  
    this.chargerDetailsMois();
  }

  chargerDetailsMois(): void {
    this.beneficeService.getDetailMois(this.annee, this.mois).subscribe(
      (data) => {
        this.details = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails', error);
      }
    );
  }
}
