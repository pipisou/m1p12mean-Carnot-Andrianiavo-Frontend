import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule

@Component({
  selector: 'app-choix-date-rendez-vous',
  templateUrl: './choix-date-rendez-vous.component.html',
  styleUrls: ['./choix-date-rendez-vous.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule,FormsModule]
})
export class ChoixDateRendezVousComponent implements OnInit {
  rendezVous: any;
  dateChoisie: string = '';
  rendezVousPresents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rendezVousService: RendezVousService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rendezVousService.getRendezVousById(id).subscribe({
        next: (data) => {
          this.rendezVous = data;
        },
        error: (err) => {
          console.error('Erreur de récupération du rendez-vous', err);
        }
      });
    }
    this.chargerRendezVousPresents();  // Charger les rendez-vous "Présents"
  }
  chargerRendezVousPresents(): void {
    this.rendezVousService.getRendezVousPresents().subscribe(data => {
      this.rendezVousPresents = data;
    });
  }
  validerDate(): void {
    if (!this.dateEstValide(this.dateChoisie)) {
      alert("La date choisie n'est pas valide.");
      return;
    }
  
    this.rendezVousService.validerRendezVous(this.rendezVous._id, this.dateChoisie).subscribe({
      next: () => {
        alert('Date enregistrée avec succès.');
        this.router.navigate(['/rendezVousEnattente']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du rendez-vous', err);
      }
    });
  }
  

  dateEstValide(date: string): boolean {
    const dateChoisie = new Date(date);
    return this.rendezVous.dateDemande.some((interval: any) => {
      const debut = new Date(interval.dateHeureDebut);
      const fin = new Date(interval.dateHeureFin);
      return dateChoisie >= debut && dateChoisie <= fin;
    });
  }
}
