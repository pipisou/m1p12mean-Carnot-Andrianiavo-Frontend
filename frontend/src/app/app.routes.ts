import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import {InscriptionComponent} from './components/Inscription/Inscription.component';
import {ClientHomeComponent} from './components/Client/Acceuil/ClientHome.Component';
import {HomePageComponent} from './components/Client/home-page/home-page.component';
import {DeviComponent} from './components/Client/devi/devi.component';
import {CommandeComponent} from './components/Client/commande/commande.component';
import { LoginAdminComponent } from './components/Admin/Mecano/login-admin/login-admin.component';
import { AccueilMecanoComponent } from './components/Admin/Mecano/accueil-mecano/accueil-mecano.component';
import {EmptyComponent} from './empty/empty.component';
// Carnot
import { ArticleComponent } from './components/Admin/article/article.component'; // Assurez-vous d'importer le bon composant
import { AjoutMecanicienComponent } from './components/Admin/ajout-mecanicien/ajout-mecanicien.component';
import { HorairesMecanicienComponent  } from './components/Admin/horaires-mecanicien/horaires-mecanicien.component';
import { AbsenceComponent  } from './components/Admin/absence/absence.component';
import { ModifierMecanicienComponent  } from './components/Admin/modifier-mecanicien/modifier-mecanicien.component';
import { AjoutCategorieComponent } from './components/Admin/ajout-categorie/ajout-categorie.component';
import { EditCategorieComponent } from './components/Admin/edit-categorie/edit-categorie.component';
import { AjoutArticleComponent } from './components/Admin/ajout-article/ajout-article.component';
import { EditArticleComponent } from './components/Admin/edit-article/edit-article.component';
import { AjoutSpecialiteComponent } from './components/Admin/ajout-specialite/ajout-specialite.component';
import { EditSpecialiteComponent } from './components/Admin/edit-specialite/edit-specialite.component';
import { AjoutStockComponent } from './components/Admin/ajout-stock/ajout-stock.component';
import { EditStockComponent } from './components/Admin/edit-stock/edit-stock.component';
import { AjoutServiceComponent } from './components/Admin/ajout-service/ajout-service.component';
import { EditServiceComponent } from './components/Admin/edit-service/edit-service.component';
import { AjoutCategorieVehiculeComponent } from './components/Admin/ajout-categorie-vehicule/ajout-categorie-vehicule.component';
import { EditCategorieVehiculeComponent } from './components/Admin/edit-categorie-vehicule/edit-categorie-vehicule.component';
import { AjoutServiceDetailsComponent } from './components/Admin/ajout-service-details/ajout-service-details.component';
import { ServiceDetailsComponent } from './components/Admin/liste-service-details/liste-service-details.component';
import {ModifierServiceDetailsComponent } from './components/Admin/modifier-detailservice/modifier-detailservice.component';
import {TacheFormComponent } from './components/Admin/ajout-tache/ajout-tache.component';
import {ListeTacheServicesDetailsComponent } from './components/Admin/liste-tache-services-details/liste-tache-services-details.component';
import {ModifierTachesComponent  } from './components/Admin/modifier-taches/modifier-taches.component';
import {AjoutDevisComponent } from './components/Admin/ajout-devis/ajout-devis.component';
import {ListeDevisComponent } from './components/Admin/liste-devis/liste-devis.component';
import {ModifierDevisComponent } from './components/Admin/modifier-devis/modifier-devis.component';
import {MenuAdminComponent } from './components/Admin/menu-admin/menu-admin.component';
import {RendezVousEnAttenteComponent} from './components/Admin/rendez-vous-en-attente-component/rendez-vous-en-attente-component.component';
import { ChoixDateRendezVousComponent } from './components/Admin/choix-date-rendez-vous/choix-date-rendez-vous.component';
import {RendezVousValidesComponent} from './components/Admin/rendez-vous-valides/rendez-vous-valides.component';
import {RendezVousNowComponent} from './components/Admin/rendez-vous-now/rendez-vous-now.component';
import { RendezVousComponent } from './components/Admin/rendez-vous/rendez-vous.component';
import { BeneficeAnnuelComponent } from './components/Admin/benefice-annuel/benefice-annuel.component';
import { BeneficeMoisComponent } from './components/Admin/benefice-mois/benefice-mois.component';
import { PlanningComponent } from './components/Admin/planning/planning.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenu', pathMatch: 'full' },
  { path: 'bienvenu', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {path: 'inscription', component: InscriptionComponent},
  {path: 'admin/login', component: LoginAdminComponent},
  {
    path: 'client',
    component: ClientHomeComponent,
    children: [
      {path: 'devi', component: DeviComponent},
      { path: 'service/:id', component: CommandeComponent },//je veux envoyer aussi d'autre parametre
      {path: 'service', component: CommandeComponent},
      {path: 'home', component: HomePageComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },
  {
    path: 'mecanicien',
    component: AccueilMecanoComponent,
    children: [
      {path: 'projets', component: EmptyComponent},
      {path: 'afaire', component: EmptyComponent},
      {path: 'terminer', component: EmptyComponent},
      {path: '', redirectTo: 'projets', pathMatch: 'full'}
    ]
  },
  //Carnot
  { path: 'admin/menu', component: MenuAdminComponent},
  { path: 'article', component: ArticleComponent },
  { path: 'ajout-mecanicien', component: AjoutMecanicienComponent },
  { path: 'horaire/:id', component: HorairesMecanicienComponent },
  { path: 'absence/:id', component: AbsenceComponent },
  { path: 'modifier-mecanicien/:id', component: ModifierMecanicienComponent },
  { path: 'categories', component: AjoutCategorieComponent },
  { path: 'modifier-categorie/:id', component: EditCategorieComponent },
  { path: 'articles', component: AjoutArticleComponent  },
  { path: 'modifier-article/:id', component: EditArticleComponent },
  { path: 'specialites', component: AjoutSpecialiteComponent  },
  { path: 'modifier-specialite/:id', component: EditSpecialiteComponent },
  { path: 'stocks', component: AjoutStockComponent  },
  { path: 'modifier-stock/:id', component: EditStockComponent },
  { path: 'services', component: AjoutServiceComponent  },
  { path: 'modifier-service/:id', component: EditServiceComponent },
  { path: 'categorie-vehicules', component: AjoutCategorieVehiculeComponent  },
  { path: 'modifier-categorie-vehicule/:id', component: EditCategorieVehiculeComponent},
  { path: 'services-details', component:  AjoutServiceDetailsComponent},
  { path: 'liste-services-details', component:  ServiceDetailsComponent},
  { path: 'modifier-services-details/:id', component:  ModifierServiceDetailsComponent},
  { path: 'tache-services-details/:id', component:  TacheFormComponent},
  { path: 'modifier-taches/:id', component:  ModifierTachesComponent },
  { path: 'liste-tache-services-details/:id', component:  ListeTacheServicesDetailsComponent},
  { path: 'ajout-devis/:id', component:  AjoutDevisComponent},
  { path: 'liste-devis/:id', component:  ListeDevisComponent},
  { path: 'modifier-devis/:id', component:  ModifierDevisComponent},
  { path: 'rendezVousEnattente', component:  RendezVousEnAttenteComponent},
  { path: 'choisirDate/:id', component: ChoixDateRendezVousComponent },
  { path: 'rendezVousValides', component: RendezVousValidesComponent },
  { path: 'rendezVousNow', component: RendezVousNowComponent },
  { path: 'rendezvous/:id', component: RendezVousComponent },
  { path: 'benefice-annuel', component: BeneficeAnnuelComponent },
  { path: 'benefice-mois/:annee/:mois', component: BeneficeMoisComponent },
  { path: 'planning', component:PlanningComponent } 


];
