import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MecanicienService } from '../../../Services/mecanicien.service';
import { AbsenceService } from '../../../Services/absence.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css'],
  imports: [ 
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AbsenceComponent implements OnInit {
  absenceForm!: FormGroup;
  mecanicien: any; // Informations sur le mécanicien, incluant son horaire
  mecanicienId!: string;
  errorMessage: string = '';
  jourValide: boolean = false;
  absences: any[] = []; // Liste des absences du mécanicien

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private mecanicienService: MecanicienService,
    private absenceService: AbsenceService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du mécanicien depuis l'URL
    this.mecanicienId = this.route.snapshot.paramMap.get('id')!;
    
    // Initialiser le formulaire d'absence
    this.absenceForm = this.fb.group({
      date: ['', Validators.required],
      debut: [''],
      fin: ['']
    });

    // Charger les infos du mécanicien (avec son horaire)
    this.mecanicienService.getMecanicienById(this.mecanicienId).subscribe(data => {
      this.mecanicien = data;
    });

    // Charger les absences du mécanicien
    this.loadAbsences();
  }

  // Charger la liste des absences du mécanicien
  loadAbsences(): void {
    this.absenceService.getAbsencesByMecanicienId(this.mecanicienId).subscribe(data => {
      this.absences = data;
    });
  }

  // Vérifier si le jour choisi correspond à un jour travaillé par le mécanicien
  onDateChange(): void {
    this.errorMessage = '';
    this.jourValide = false;
    const dateValue = this.absenceForm.value.date;
    if (!dateValue) return;

    const selectedDate = new Date(dateValue);
    // Obtenir le jour de la semaine en français (ex: "mercredi")
    const weekday = selectedDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    // Normaliser pour comparer (première lettre en majuscule)
    const jourSelectionne = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase();

    // Vérifier si le mécanicien a un horaire et s'il travaille ce jour
    if (this.mecanicien && this.mecanicien.horaire && this.mecanicien.horaire.joursTravail) {
      const horaireDuJour = this.mecanicien.horaire.joursTravail.find((j: any) => j.jour === jourSelectionne);
      if (horaireDuJour) {
        this.jourValide = true;
        // Pré-remplir les heures avec les valeurs par défaut de l'horaire du jour
        this.absenceForm.patchValue({
          debut: horaireDuJour.debut,
          fin: horaireDuJour.fin
        });
      } else {
        this.errorMessage = `Le mécanicien ne travaille pas le ${jourSelectionne}.`;
      }
    } else {
      this.errorMessage = "Les horaires du mécanicien ne sont pas disponibles.";
    }
  }

  // Soumettre le formulaire d'absence
  onSubmit(): void {
    if (this.absenceForm.invalid || !this.jourValide) return;

    const absenceData = {
      mecanicien: this.mecanicienId,
      date: this.absenceForm.value.date,
      debut: this.absenceForm.value.debut,
      fin: this.absenceForm.value.fin
    };

    this.absenceService.addAbsence(absenceData).subscribe({
      next: () => {
        alert('Absence ajoutée avec succès !');
        this.absenceForm.reset();
        this.loadAbsences(); // Recharger les absences après ajout
      },
      error: (err) => console.error('Erreur lors de l\'ajout de l\'absence', err)
    });
  }

  // Méthode pour supprimer une absence
  deleteAbsence(absenceId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette absence ?')) {
      this.absenceService.deleteAbsence(absenceId).subscribe({
        next: () => {
          alert('Absence supprimée avec succès !');
          this.loadAbsences(); // Recharger les absences après suppression
        },
        error: (err) => console.error('Erreur lors de la suppression de l\'absence', err)
      });
    }
  }
}
