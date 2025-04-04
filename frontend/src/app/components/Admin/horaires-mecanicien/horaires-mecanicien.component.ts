import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HoraireService } from '../../../Services/horaire.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-horaires-mecanicien',
  templateUrl: './horaires-mecanicien.component.html',
  styleUrls: ['./horaires-mecanicien.component.css'],
  imports: [ 
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class HorairesMecanicienComponent implements OnInit {
  horaireForm!: FormGroup;
  joursDisponibles = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  mecanicienId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private horaireService: HoraireService
  ) {}

  ngOnInit(): void {
    this.mecanicienId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadHoraire();
  }

  initForm() {
    this.horaireForm = this.fb.group({
      joursTravail: this.fb.array(this.joursDisponibles.map(jour => this.fb.group({
        jour: [jour],
        actif: [false], // Coché ou non
        debut: [''], // Heure de début
        fin: [''], // Heure de fin
        pauseDebut: [''], // Heure de début de la pause
        pauseFin: [''] // Heure de fin de la pause
      })))
    });
  }

  joursTravail(): FormArray {
    return this.horaireForm.controls['joursTravail'] as FormArray;
  }

  loadHoraire() {
    this.horaireService.getHoraire(this.mecanicienId).subscribe(data => {
      if (data && data.joursTravail) {
        this.joursTravail().controls.forEach((control: any) => {
          const found = data.joursTravail.find((j: any) => j.jour === control.value.jour);
          if (found) {
            control.patchValue({ 
              actif: true, 
              debut: found.debut, 
              fin: found.fin, 
              pauseDebut: found.pause?.debut || '', 
              pauseFin: found.pause?.fin || '' 
            });
          }
        });
      }
    });
  }

  onSubmit() {
    const joursTravail = this.joursTravail().value
      .filter((j: any) => j.actif)
      .map((j: any) => ({
        jour: j.jour,
        debut: j.debut,
        fin: j.fin,
        pause: {
          debut: j.pauseDebut,
          fin: j.pauseFin
        }
      }));

    this.horaireService.updateHoraire(this.mecanicienId, { joursTravail }).subscribe(() => {
      alert('Horaire mis à jour avec succès !');
    });
  }
}
