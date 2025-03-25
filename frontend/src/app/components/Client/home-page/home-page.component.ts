import { Component } from '@angular/core';
import {Login} from '../../../Models/Interfaces';
import {VehiculeComponent} from '../../vehicule/vehicule.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';

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
  constructor() {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
  }
  showModal(){
    this.isVisible = true
  }
  hideModal(){
    this.isVisible = false
  }
}
