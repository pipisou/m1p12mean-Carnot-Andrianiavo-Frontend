import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FooterElementComponent } from '../../../../footer-element/footer-element.component';
import {NzSegmentedModule} from 'ng-zorro-antd/segmented';
import {QuitterService} from '../../../quitter/quitter.service';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {MecanoRoutes} from '../../../../Conf/RouteConf';
import { HomeMecanoComponent } from '../home-mecano/home-mecano.component';
import { AfaireComponent } from '../afaire/afaire.component';
import { TerminerComponent } from '../terminer/terminer.component';
import { LoginMecanicien } from '../../../../Models/Interfaces';

@Component({
  selector: 'app-accueil-mecano',
  imports: [NzDropDownModule, HomeMecanoComponent, AfaireComponent, TerminerComponent, RouterModule, NzSegmentedModule,FormsModule, CommonModule, FooterElementComponent, NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, NzListModule, NzProgressModule, NzToolTipModule],
  templateUrl: './accueil-mecano.component.html',
  styleUrl: './accueil-mecano.component.css'
})
export class AccueilMecanoComponent {
  routeConf: any[]
  page: any = null
  mecanicien: LoginMecanicien
  constructor(private router: Router,  private quitter: QuitterService) {
    this.routeConf = MecanoRoutes
    this.mecanicien = JSON.parse(sessionStorage.getItem("user") || '{}')
  }

  ngOnInit(){
    if (!this.mecanicien.token){
      this.router.navigate(["admin/login"])
      return
    }
    this.updatePageFromUrl()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageFromUrl()
      }
    });
  }
  updatePageFromUrl() {
    const urlActuel = this.router.url;
    const routeCorrespondante = this.routeConf.find((e) =>
      urlActuel.toLowerCase().includes(e.path.toLowerCase())
    );

    if (routeCorrespondante) {
      this.page = routeCorrespondante;
    } else {
      this.router.navigate(['/login']);
    }
  }

  showConfirm(){
    this.quitter.showConfirm()
  }


  navigateTo(value: string){
    this.router.navigate([`/mecanicien/${value}`]);
  }
}
