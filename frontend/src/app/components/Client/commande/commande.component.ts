import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { AfficheDeviComponent } from '../affiche-devi/affiche-devi.component';
import {RenderVous} from '../../../Models/Interfaces';
import {CurrentCommandeService} from './current-commande.service';

@Component({
  selector: 'app-commande',
  imports: [NzToolTipModule, AfficheDeviComponent, CommonModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  afficheEnAttent: boolean = true
  commandeServices: RenderVous[] =[]//lister de tous les devi

  ngOnInit(){
    this.currentRendeVousObject.currentCommande$.subscribe(
      (commande)=>{
        if (commande){
          console.log(commande)
          this.afficheEnAttent = false
        }else{
          this.afficheEnAttent = true
        }
      }
    )
  }

  constructor(private rendezVous: RendezVousService, private currentRendeVousObject: CurrentCommandeService) {
  }

  hideAfficheEnAttent(){
    this.afficheEnAttent = false
  }
}
