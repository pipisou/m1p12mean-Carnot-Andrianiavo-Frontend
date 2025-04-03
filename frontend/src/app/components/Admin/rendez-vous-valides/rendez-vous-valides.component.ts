import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule
@Component({
  selector: 'app-rendez-vous-valides',
  templateUrl: './rendez-vous-valides.component.html',
  styleUrls: ['./rendez-vous-valides.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule,FormsModule]
})
export class RendezVousValidesComponent implements OnInit {
  rendezVousValides: any[] = [];

  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.chargerRendezVousValides();
  }

  // Charger la liste des rendez-vous validés
  chargerRendezVousValides(): void {
    this.rendezVousService.getRendezVousValides().subscribe(data => {
      this.rendezVousValides = data;
    });
  }

  // Marquer un rendez-vous comme "Présent"
  marquerPresent(id: string): void {
    this.rendezVousService.updateStatutRendezVous(id, 'présent').subscribe(() => {
      this.chargerRendezVousValides(); // Rafraîchir la liste
    });
  }

  // Marquer un rendez-vous comme "Absent"
  marquerAbsent(id: string): void {
    this.rendezVousService.updateStatutRendezVous(id, 'absent').subscribe(() => {
      this.chargerRendezVousValides(); // Rafraîchir la liste
    });
  }
}