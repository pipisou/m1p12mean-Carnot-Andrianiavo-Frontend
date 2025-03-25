import { Component } from '@angular/core';
import {Login} from '../../../Models/Interfaces';
import {VehiculeComponent} from '../../vehicule/vehicule.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {HomeService} from './HomeService';


@Component({
  selector: 'app-home-page',
  imports: [VehiculeComponent, NzModalModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true
})
export class HomePageComponent {
  user: Login
  isVisible: boolean = false
  constructor(private showService: HomeService) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
    this.showService.modalState$.subscribe(state => {
      this.isVisible = state;
    });
  }
  showModal(){
    this.showService.showModal();
  }
  hideModal(){
    this.showService.hideModal();
  }
}
