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
    this.chargerRendezVousValides();  // Charger les rendez-vous "Présents"
  }
  chargerRendezVousValides(): void {
    this.rendezVousService.getRendezVousValides().subscribe(data => {
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
        this.router.navigate(['admin/menu/rendezVousEnattente']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du rendez-vous', err);
      }
    });
  }
  

  dateEstValide(date: string): boolean {
    const dateChoisie = new Date(date);
    dateChoisie.setSeconds(0, 0); // Ignore les secondes et millisecondes
    console.log("date choisie=", dateChoisie);
  
    return this.rendezVous.dateDemande.some((interval: any) => {
      const debut = new Date(interval.dateHeureDebut);
      debut.setSeconds(0, 0); // Ignore secondes/millisecondes
      console.log("date debut=", debut);
  
      const fin = new Date(interval.dateHeureFin);
      fin.setSeconds(0, 0); // Ignore secondes/millisecondes
      console.log("date fin=", fin);
  
      return dateChoisie >= debut && dateChoisie <= fin;
    });
  }
  
}
