import {Component, Input, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

interface Service {
  id: number;
  nom: string;
}

interface Categorie {
  id: number;
  children: Service[];
}

@Component({
  selector: 'app-detail-categorie',
  imports: [CommonModule],
  templateUrl: './detail-categorie.component.html',
  styleUrl: './detail-categorie.component.css',
  standalone: true
})
export class DetailCategorieComponent {
  @Input() categorieId!: number;
  listDetailService: Service[] = []
  listCategorie: Categorie[] =[
    {id: 1, children: [
        {id: 1, nom: 'Diagnostic moteur'},
        {id: 2, nom: 'Vidange d\'huile et remplacement du filtre à huile'},
        {id: 3, nom: 'Remplacement du filtre à air et du filtre à carburant'},
        {id: 4, nom: 'Réparation ou remplacement du moteur'},
        {id: 5, nom: 'Changement de courroie de distribution ou chaîne de distribution'},
        {id: 6, nom: 'Réglage et réparation du système d\'injection'},
      ]},
    {id: 2, children: [
        {id: 1, nom: 'Réparation ou remplacement de l’embrayage'},
        {id: 2, nom: 'Vidange et entretien de la boîte de vitesses (manuelle ou automatique)'},
        {id: 3, nom: 'Réparation du différentiel et cardans'},
      ]},
    {id: 3, children: [
        {id: 1, nom: 'Remplacement des plaquettes et disques de frein'},
        {id: 2, nom: 'Changement du liquide de frein'},
        {id: 3, nom: 'Réparation ou remplacement des étriers et flexibles de frein'},
        {id: 4, nom: 'Remplacement du maître-cylindre de frein'},
      ]},
    {id: 4, children: [
        {id: 1, nom: 'Remplacement des amortisseurs et ressorts'},
        {id: 2, nom: 'Géométrie et parallélisme des roues'},
        {id: 3, nom: 'Réparation ou remplacement de la crémaillère de direction'},
        {id: 4, nom: 'Vérification et remplacement des rotules et silent blocs'},
      ]},
    {id: 5, children: [
        {id: 1, nom: 'Diagnostic électronique via OBD'},
        {id: 2, nom: 'Remplacement de la batterie'},
        {id: 3, nom: 'Réparation du démarreur et de l\'alternateur'},
        {id: 4, nom: 'Réparation des faisceaux électriques et des capteurs'},
        {id: 5, nom: 'Remplacement des ampoules et phares'},
      ]},
    {id: 6, children: [
        {id: 1, nom: 'Recharge de climatisation'},
        {id: 2, nom: 'Détection et réparation des fuites du circuit de climatisation'},
        {id: 3, nom: 'Remplacement du filtre d’habitacle'},
        {id: 4, nom: 'Réparation du système de chauffage'},
      ]},
    {id: 7, children: [
        {id: 1, nom: 'Remplacement du pot d\'échappement'},
        {id: 2, nom: 'Réparation ou remplacement du catalyseur'},
        {id: 3, nom: 'Remplacement du filtre à particules (FAP)'},
        {id: 4, nom: 'Détection et réparation des fuites d\'échappement'},
      ]},
    {id: 8, children: [
        {id: 1, nom: 'Montage et équilibrage des pneus'},
        {id: 2, nom: 'Géométrie et alignement des roues'},
        {id: 3, nom: 'Réparation des pneus crevés'},
        {id: 4, nom: 'Pression et contrôle de l\'usure des pneus'},
      ]},
    {id: 9, children: [
        {id: 1, nom: 'Débosselage et redressage des éléments de carrosserie'},
        {id: 2, nom: 'Peinture et retouches'},
        {id: 3, nom: 'Réparation ou remplacement des pare-chocs'},
        {id: 4, nom: 'Traitement contre la rouille'},
      ]},
    {id: 10, children: [
        {id: 1, nom: 'Réparation ou remplacement du pare-brise'},
        {id: 2, nom: 'Teintage des vitres'},
        {id: 3, nom: 'Remplacement des rétroviseurs'},
        {id: 4, nom: 'Réparation ou remplacement des essuie-glaces'},
      ]},
  ]
  listSelectedCategories: Set<number> = new Set<number>()
  setSelectedCategorie(categorie: number){
    if (this.listSelectedCategories.has(categorie)){
      this.listSelectedCategories.delete(categorie)
    }else{
      this.listSelectedCategories.add(categorie)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categorieId']) {
      const t: Categorie | undefined = this.listCategorie.find(e => e.id === this.categorieId);
      if (t){
        this.listDetailService =t.children
      }
      console.log('Nouvelle catégorie sélectionnée :', this.categorieId);
    }
  }
}
