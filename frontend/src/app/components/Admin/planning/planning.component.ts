import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid'; // ✅ Import du plugin timeGrid
import interactionPlugin from '@fullcalendar/interaction'; // Facultatif, pour l'interaction
import { MecanicienService } from '../../../Services/mecanicien.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  imports: [FullCalendarModule, RouterModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class PlanningComponent implements OnInit {
  isModalOpen = false;
  mecaniciens: any[] = [];  // Liste des mécaniciens
  selectedMecanicien: any = null;  // Mécanicien sélectionné
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin], // ✅ Ajout du plugin ici
    initialView: 'timeGridWeek', // ✅ Vue en mode "semaine"
    events: [], // Tu rempliras cette liste avec tes rendez-vous
    selectable: true,
    editable: false,
    eventClick: (info) => {
      const reference = info.event.extendedProps['reference'];
      const tache = info.event.extendedProps['tache'];
      const service = info.event.extendedProps['service'];
      const mecanicien = info.event.extendedProps['mecanicien'];
    
      alert(`Rendez-vous: ${reference}\nTâche: ${tache}\nService: ${service.nomService}\nMécanicien: ${mecanicien}`);
    }
    
  };

  constructor(private rendezVousService: RendezVousService, private mecanicienService: MecanicienService) {}

  ngOnInit() {
    this.loadMecaniciens();
    this.loadPlanning();  // Charger le planning initialement
  }

  // Charger la liste des mécaniciens
  loadMecaniciens() {
    this.mecanicienService.getMecaniciens().subscribe(
      (data) => {
        this.mecaniciens = data;  // Stocker la liste des mécaniciens
      },
      (error) => console.error('Erreur lors du chargement des mécaniciens:', error)
    );
  }

  // Fonction pour convertir la date locale en datetime-local (format 'YYYY-MM-DDTHH:MM')
  formatDateForInput(dateISO: string): string {
    if (!dateISO) return '';

    const [datePart, timePart] = dateISO.split('T'); // Séparer la date et l'heure
    const time = timePart.slice(0, 5); // Garder uniquement HH:mm

    return `${datePart}T${time}`; // Reformater pour datetime-local
  }
// Charger le planning
loadPlanning() {
  this.rendezVousService.getRendezPayerPresent().subscribe(
    (rendezVousList) => {
      const events: any[] = [];

      rendezVousList.forEach((rdv: any) => {
        rdv.taches.forEach((tache: any) => {
          if (tache.dateHeureDebut && tache.dateHeureFin) {
            const start = this.formatDateForInput(tache.dateHeureDebut);
            const end = this.formatDateForInput(tache.dateHeureFin);

            // Si un mécanicien est sélectionné, on filtre les événements par celui-ci
            if (!this.selectedMecanicien || tache.mecanicien._id === this.selectedMecanicien._id) {
              events.push({
                title: `Rdv: ${rdv.devis.referenceDevis} | Tâche: ${tache.tache.description} - ${tache.mecanicien?.nom || 'Non assigné'}`,
                start: start,
                end: end,
                extendedProps: {
                  reference: rdv.devis.referenceDevis,
                  tache: tache.tache.description,
                  service: { nomService: tache.tache.serviceDetails.service.nomService },
                  mecanicien: tache.mecanicien?.nom || 'Non assigné',
                },
                backgroundColor: tache.statut === 'terminée' ? 'green' :
                                 tache.statut === 'en cours' ? 'orange' : 'red'
              });
            }
          }
        });
      });

      this.calendarOptions = { ...this.calendarOptions, events };
    },
    (error) => console.error('Erreur lors du chargement des rendez-vous:', error)
  );
}


  // Méthode pour sélectionner un mécanicien
  onSelectMecanicien() {
    this.loadPlanning();  // Recharger le planning en filtrant par mécanicien sélectionné
  }
  
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
