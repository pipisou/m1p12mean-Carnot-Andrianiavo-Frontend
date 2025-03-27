import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { AfficheDeviComponent } from '../affiche-devi/affiche-devi.component';

@Component({
  selector: 'app-commande',
  imports: [NzToolTipModule, AfficheDeviComponent, CommonModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  afficheEnAttent: boolean = true
  commandeServices=[]

  ngOnInit(){
    this.afficheEnAttent = true
  }

  constructor(private rendezVous: RendezVousService) {
  }

  hideAfficheEnAttent(){
    this.afficheEnAttent = false
  }
}
