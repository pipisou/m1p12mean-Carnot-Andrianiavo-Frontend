import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QuitterService} from '../../../quitter/quitter.service';
import {DetailService, LoginMecanicien} from '../../../../Models/Interfaces';
import {RendezVousService} from '../../../../Services/rendez-vous.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzEmptyModule} from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-afaire',
  imports: [RouterModule, NzPaginationModule, FormsModule, CommonModule, NzEmptyModule],
  templateUrl: './afaire.component.html',
  styleUrl: './afaire.component.css'
})
export class AfaireComponent {

  @Input( )tacheAfaire: {dateHeureDebut: Date, dateHeureFin: Date, _id: string,  tache: DetailService, idRdv: string, immatriculation: string}[] = []
  @Output() setLoading: EventEmitter<void> = new EventEmitter<void>()
  @Output() afterUpdate: EventEmitter<void> = new EventEmitter<void>()

  mecanicien: LoginMecanicien

  constructor(private router: Router,  private quitter: QuitterService, private service: RendezVousService,  private toast: NzMessageService) {
    this.mecanicien = JSON.parse(sessionStorage.getItem("user") || '{}')
  }

  modifStatut(idRdv: string, idTache: string){
    this.setLoading.emit()
    this.service.modifStatutTache({Authorization: `Bearer ${this.mecanicien.token}`}, idRdv, {tacheId: idTache, newStatus: 'en cours'}).subscribe(
      rep=>{
        console.log(rep)
        this.afterUpdate.emit()
      },
      error => {
        this.afterUpdate.emit()
        this.toast.error(error.message, {nzDuration: 5000})
      }
    )
  }

  showValidation(idRdv: string, idTache: string){
    this.quitter.showValidate(()=>this.modifStatut(idRdv, idTache), 'Voulez-vous prendre votre tache?')
  }

  currentPage = 1
  modifCurrentPage(value: any){
    this.currentPage = value
  }
}
