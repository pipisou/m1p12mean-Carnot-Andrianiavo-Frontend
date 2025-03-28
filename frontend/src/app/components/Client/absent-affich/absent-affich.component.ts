import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Login, RenderVous} from '../../../Models/Interfaces';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {QuitterService} from '../../quitter/quitter.service';
import {FormsModule} from '@angular/forms';
import {ModifRendezvousComponent} from '../modif-rendezvous/modif-rendezvous.component';
import {RendezVousService} from '../../../Services/rendez-vous.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-absent-affich',
  imports: [NzModalModule, CommonModule, NzButtonModule, FormsModule, ModifRendezvousComponent],
  templateUrl: './absent-affich.component.html',
  styleUrl: './absent-affich.component.css'
})
export class AbsentAffichComponent {
  @Input() isVisible: boolean = false
  @Input() listRendezVous: RenderVous[] = []

  @Output() fonctHide: EventEmitter<void> = new EventEmitter<void>();
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();

  hideRendezVous(){
    this.fonctHide.emit()
  }

  currentDelete: Set<string> = new Set<string>()
  deletedValidate(id: string):void {
    this.currentDelete.add(id)
    this.service.deleteRendezVous({ Authorization: `Bearer ${this.user.token}` }, id).subscribe(
      rep=>{
        this.currentDelete.delete(id)
        this.hideRendezVous()
        this.reload.emit()
        this.toast.info(rep.message, {nzDuration:5000})
      },
      error => {
        this.currentDelete.delete(id)
        this.toast.info(error.message, {nzDuration:5000})
      }
    )
  }

  user: Login
  constructor(private quitter: QuitterService, private service: RendezVousService,  private toast: NzMessageService) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
  }

  clickDelete(idClicked: string, ref: string){
    this.quitter.showValidate(()=> this.deletedValidate(idClicked),`Voulez-vous vraiment supprimer: ${ref}`)
  }


  visibleRendezVous = false
  currentClickedModif: string = ''
  hideModifRendezVous(){
    this.visibleRendezVous = false
  }
  showGetRendezVous(currentIdClicked: string){
    this.currentClickedModif=currentIdClicked
    this.visibleRendezVous = true
  }

  submit(valeur: boolean){
    if (valeur){
      this.hideRendezVous()
      // this.reload.emit()
      window.location.reload()
    }
  }
}
