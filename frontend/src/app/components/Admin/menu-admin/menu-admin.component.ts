import { Component } from '@angular/core';
import {RouterModule, Router, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {FooterElementComponent} from '../../../footer-element/footer-element.component';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzDropDownModule,
    FooterElementComponent
  ],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
  menuItems = [

    { label: 'Commandes en cours', path: '/admin/menu/rendezVousNow', icon: 'fa-calendar-day' },
    { label: 'Rendez-vous programmés', path: '/admin/menu/rendezVousValides', icon: 'fa-check-circle' },
    { label: 'Rendez-vous en attente', path: '/admin/menu/rendezVousEnattente', icon: 'fa-hourglass-half' },
    { label: 'Planning', path: '/admin/menu/planning', icon: 'fa-calendar' },
    { label: 'Bénéfice ', path: '/admin/menu/benefice-annuel', icon: 'fa-chart-line' },
    { label: 'Services', path: '/admin/menu/services', icon: 'fa-wrench' },
    { label: 'Catégories Véhicules', path: '/admin/menu/categorie-vehicules', icon: 'fa-car' },
    { label: 'Services Véhicules', path: '/admin/menu/liste-services-details', icon: 'fa-list' },
    { label: 'Mécaniciens', path: '/admin/menu/ajout-mecanicien', icon: 'fa-user-cog' },

    { label: 'Catégories Articles', path: '/admin/menu/categories', icon: 'fa-list' },
    { label: 'Ajouter Article', path: '/admin/menu/articles', icon: 'fa-box-open' },
    { label: 'Stocks', path: '/admin/menu/stocks', icon: 'fa-warehouse' },
  ];


  user = { admin: { prenom: 'Manager', nom: '' } };

  page: string = '';

  constructor(private router: Router) {}

  ngOnInit(){
    this.updatePageFromUrl()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageFromUrl()
      }
    });
  }

  updatePageFromUrl() {
    const urlActuel = this.router.url;
    const routeCorrespondante = this.menuItems.find((e) =>
      urlActuel.toLowerCase().includes(e.path.toLowerCase())
    );

    if (routeCorrespondante) {
      this.page = routeCorrespondante.path;
    }
  }

  changeRoute(path: string) {
    this.router.navigate([path]);
  }

  logOut() {
    console.log('Déconnexion...');
    this.router.navigate(['/admin/login']);
  }
}
