import { Component } from '@angular/core';
import {DetailService, Login} from '../../../Models/Interfaces';
import {VehiculeComponent} from '../../vehicule/vehicule.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {RendezVousComponent} from '../rendez-vous/rendez-vous.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [VehiculeComponent, NzModalModule, CommonModule, RendezVousComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true
})
export class HomePageComponent {
  user: Login
  isVisible: boolean = false
  listSelectedDetailCat: Set<DetailService> = new Set<DetailService>()
  constructor( private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
  }
  showModal(){
    this.isVisible = true
  }
  hideModal(){
    this.isVisible = false
  }

  visibleRendezVous: boolean = false

  showVisibleRendezVous(){
    this.visibleRendezVous = true
  }

  hideRendezVous(){
    this.visibleRendezVous = false
  }

  onModalClosed(): void {
    this.router.navigate(["/client/home"]).then(() => {
      window.location.reload();
    });
  }
}
