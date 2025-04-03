import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Pour récupérer l'ID de la route
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { StockService } from '../../../Services/stock.service'; // ✅ Importer StockService
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Router} from '@angular/router';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid'; // ✅ Import du plugin timeGrid
import interactionPlugin from '@fullcalendar/interaction'; // Facultatif, pour l'interaction
import { MecanicienService } from '../../../Services/mecanicien.service';
@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css'],
  imports: [FullCalendarModule, RouterModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class RendezVousComponent implements OnInit {
  isModalOpen = false;
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
  validDates: boolean = true;
  validationDatesCorrectes: boolean = true;
  erreurQuantite: string = ''; 
  rendezVous: any;
  mecaniciens: any[] = [];  // Liste des mécaniciens
  totalStock: any[] = []; // ✅ Stock mis à jour sous forme de tableau
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private rendezVousService: RendezVousService,
    private mecanicienService: MecanicienService,  // Service pour récupérer les mécaniciens
    private stockService: StockService // ✅ Injecter StockService
  ) {}

  ngOnInit(): void {
            // Récupérer les mécaniciens
            this.mecanicienService.getMecaniciens().subscribe((data: any[]) => {
              this.mecaniciens = data;  // Remplir la liste des mécaniciens
              // Charger à nouveau les détails après avoir récupéré les mécaniciens
       
            });
    this.loadPlanning();  // Charger le planning initialement
    // Récupérer l'ID du rendez-vous à partir de l'URL
    const rdvId = this.route.snapshot.paramMap.get('id');
    if (rdvId) {
      this.chargerDetailsRendezVous(rdvId);
    }

        this.getTotalStockUpdated();    
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
    // ✅ Récupérer la liste des articles en stock après mise à jour
    getTotalStockUpdated(): void {
      this.stockService.getTotalStockUpdated().subscribe(
        (data: any[]) => {
          this.totalStock = data;
          console.log("Stock mis à jour :", data);
        },
        (error) => {
          console.error("Erreur lors de la récupération du stock mis à jour :", error);
        }
      );
    }
  

  // Charger les détails du rendez-vous
// Fonction pour convertir la date locale en datetime-local (format 'YYYY-MM-DDTHH:MM')
formatDateForInput(dateISO: string): string {
  if (!dateISO) return '';

  const [datePart, timePart] = dateISO.split('T'); // Séparer date et heure
  const time = timePart.slice(0, 5); // Garder uniquement HH:mm

  return `${datePart}T${time}`; // Reformater pour datetime-local
}



  chargerDetailsRendezVous(id: string): void {
    this.rendezVousService.getRendezVousById(id).subscribe((data) => {
      this.rendezVous = data;
console.log(this.rendezVous);
      // Pré-sélectionner les valeurs des champs de date pour chaque tâche
      this.rendezVous.taches.forEach((tache: any) => {
        // Si la date est présente, convertir la date au format local attendu par datetime-local
        if (tache.dateHeureDebut) {
          console.log(tache.dateHeureDebut);
          tache.dateHeureDebut = this.formatDateForInput(tache.dateHeureDebut);
        }
        if (tache.dateHeureFin) {
          tache.dateHeureFin = this.formatDateForInput(tache.dateHeureFin);
        }
  
        // Si un mécanicien est déjà assigné à la tâche, il sera pré-sélectionné
        if (tache.mecanicien && this.mecaniciens) {
         
     
            tache.mecanicien = tache.mecanicien._id;
            this.checkMecanicienService(tache);
         
        }
      });
    });
  }
  
  
  // Fonction pour convertir la date ISO en format local attendu par datetime-local


  modifierDevis(devisId: string): void {
    this.router.navigate(['/modifier-devis', devisId]);  // Redirige vers /modifier-devis/:devisId
  }
// Fonction pour convertir une date locale en format datetime-local (sans fuseau horaire)

  updatearticlesUtilisesRendezVous(): void {
    if (!this.rendezVous) {
      console.error("Aucun rendez-vous sélectionné.");
      return;
    }
  


    const updatedArticles = this.rendezVous.articlesUtilises.map((article: any) => ({
      article: article.article,
      quantite: article.quantite,
      prixVente: article.prixVente, // Prix de vente de l'article
      prixAchat: article.prixAchat, // Prix d'achat de l'article
      fournisseur: article.fournisseur // Fournisseur de l'article
    }));
    
    this.rendezVousService.updatearticlesUtilisesRendezVous(this.rendezVous._id,updatedArticles).subscribe(
      response => {
        console.log("Tâches et articles mis à jour avec succès :", response);
        alert("articles enregistrées !");
      },
      error => {
        console.error("Erreur lors de la mise à jour :", error);
  
        let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
  
        if (error.error && error.error.error) {
          errorMessage = error.error.error; // Message d'erreur du serveur
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
  
        alert(errorMessage); // Afficher l'erreur en alerte
      }
    );
  }
  
  modalOuvert = false;
articleSelectionne: any = null;
quantiteSelectionnee: number = 1;

ouvrirModalArticles(): void {
  this.modalOuvert = true;
}

fermerModal(): void {
  this.modalOuvert = false;
  this.articleSelectionne = null;
  this.quantiteSelectionnee = 1;
}
verifierQuantite() {
  if (this.articleSelectionne?.totalQuantite === 0) {
    // Si le stock est à zéro, afficher un message d'erreur et empêcher l'ajout
    this.erreurQuantite = 'Le stock est épuisé, il est impossible d\'ajouter cet article.';
    this.quantiteSelectionnee = 0;  // Réinitialiser à zéro si le stock est épuisé
    alert('Le stock est épuisé, il est impossible d\'ajouter cet article.');
  } else if (this.quantiteSelectionnee > this.articleSelectionne?.totalQuantite) {
    // Si la quantité sélectionnée dépasse le stock
    this.erreurQuantite = `La quantité sélectionnée dépasse le stock disponible (Stock: ${this.articleSelectionne?.totalQuantite}).`;
    this.quantiteSelectionnee = this.articleSelectionne?.totalQuantite;  // Limiter la quantité à celle du stock
    alert('La quantité sélectionnée dépasse le stock disponible !');
  } else if (this.quantiteSelectionnee <= 0) {
    // Si la quantité est inférieure ou égale à 0
    this.erreurQuantite = 'La quantité doit être supérieure à zéro.';
    this.quantiteSelectionnee = 0;  // Réinitialiser à zéro ou laisser la quantité sélectionnée à 0
    alert('La quantité doit être supérieure à zéro.');
  } else {
    // Si la quantité est valide, réinitialiser l'erreur
    this.erreurQuantite = '';
  }
}
ajouterArticle(): void {
  if (this.articleSelectionne && this.quantiteSelectionnee > 0) {
    // Vérifier si la quantité que vous voulez ajouter dépasse le stock disponible
    if (this.quantiteSelectionnee > this.articleSelectionne.totalQuantite) {
      alert(`La quantité que vous souhaitez ajouter dépasse le stock disponible (Stock disponible: ${this.articleSelectionne.totalQuantite}).`);
      return;  // Ne pas ajouter l'article si la quantité dépasse le stock
    }

    // Ajouter l'article à la liste des articles utilisés
    const nouvelArticle = {
      article: this.articleSelectionne.article,
      quantite: this.quantiteSelectionnee,
      prixVente: this.articleSelectionne.prixVente,
      prixAchat: this.articleSelectionne.prixAchat,
      fournisseur: this.articleSelectionne.fournisseur
    };

    console.log("Article ajouté :", nouvelArticle);
    this.rendezVous.articlesUtilises.push(nouvelArticle);  // Ajout de l'article à la liste des articles utilisés
    this.fermerModal();  // Fermer la modale après l'ajout
  } else {
    alert("Veuillez sélectionner un article et une quantité valide.");
  }
}


supprimerArticle(index: number): void {
  // Retirer l'article de la liste des articles utilisés
  this.rendezVous.articlesUtilises.splice(index, 1);
  console.log('Article supprimé', this.rendezVous.articlesUtilises);
}

payerRendezVous(): void {
  if (!this.rendezVous) return;

  this.rendezVous.statut = 'payé'; // Mise à jour du statut

  this.rendezVousService.updateStatutRendezVous(this.rendezVous._id,  'payé' ).subscribe(
    (response) => {
      console.log('Statut mis à jour avec succès', response);
      alert('Le rendez-vous a été marqué comme payé.');
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du statut', error);
      alert('Une erreur est survenue.');
    }
  );
  
}

convertToUTC(dateString: string) {
    // Créer un objet Date à partir de la chaîne locale
    const localDate = new Date(dateString);

    // Obtenir le décalage horaire en minutes
    const timezoneOffset = localDate.getTimezoneOffset();

    // Convertir la date en UTC en ajustant le décalage horaire
    const utcDate = new Date(localDate.getTime() - timezoneOffset * 60000);

    // Retourner la date en format ISO UTC (avec le suffixe "Z" pour indiquer le fuseau horaire UTC)
    return utcDate.toISOString();
}


validateDates(tache: any) {
  // Vérifie que la date de fin est supérieure à la date de début
  if (tache.dateHeureDebut && tache.dateHeureFin) {
    const dateDebut = new Date(tache.dateHeureDebut);
    const dateFin = new Date(tache.dateHeureFin);
    
    if (dateFin <= dateDebut) {
      tache.isValid = false;
    } else {
      tache.isValid = true;
    }
  }
}
validateAllDates() {
  this.validDates = true; // On suppose que tout est valide au début

  this.rendezVous.taches.forEach((tache: any) => {
    const dateDebut = new Date(tache.dateHeureDebut);
    const dateFin = new Date(tache.dateHeureFin);
    
    // Vérifie si les dates sont valides
    const datesValides = tache.dateHeureFin && tache.dateHeureDebut && dateFin > dateDebut;

    // Vérifie si le service est autorisé
    const serviceAutoriseValid = tache.serviceAutorise;

    // Si une seule tâche n'est pas valide, on désactive l'enregistrement
    if (!datesValides || !serviceAutoriseValid) {
      this.validDates = false;
    }
  });
}


checkMecanicienService(tache: any) {
  if (!tache.mecanicien) {
    tache.serviceAutorise = false;
    this.validDates = false; // Désactive le bouton si aucun mécanicien n'est sélectionné
    return;
  }
  console.log("fa aona",tache.mecanicien);
  console.log("fa aona",this.mecaniciens);
  const mecanicienSelectionne = this.mecaniciens.find(m => m._id === tache.mecanicien);

  if (mecanicienSelectionne) {

    tache.serviceAutorise = mecanicienSelectionne.services.some((service: any) =>
      service._id.toString() === tache.tache.serviceDetails.service._id.toString()
    );
    console.log(tache.tache.serviceDetails.service._id);
    
  } else {
    tache.serviceAutorise = false;
  }

  // Si la tâche n'a pas de service autorisé, on désactive immédiatement le bouton
  if (!tache.serviceAutorise) {
    this.validDates = false;
    return;
  }

  // Vérifie toutes les tâches après la mise à jour
  this.validateAllDates();
}
updateTache(tache: any) {
  if (!tache.mecanicien || !tache.dateHeureDebut || !tache.dateHeureFin) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  const tacheData = {
    tacheId: tache.tache._id,
    mecanicien: tache.mecanicien,
    dateHeureDebut: this.convertToUTC(tache.dateHeureDebut),
    dateHeureFin: this.convertToUTC(tache.dateHeureFin)
  };

  this.rendezVousService.updateTachesRendezVous(this.rendezVous._id, tacheData).subscribe(
    response => {
      console.log("Tâches et articles mis à jour avec succès :", response);
      alert("Modifications enregistrées !");
    },
    error => {
      console.error("Erreur lors de la mise à jour :", error);

      let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";

      if (error.error && error.error.error) {
        errorMessage = error.error.error; // Message d'erreur du serveur
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }

      alert(errorMessage); // Afficher l'erreur en alerte
    }
  );
}


openModal() {
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
}

}
