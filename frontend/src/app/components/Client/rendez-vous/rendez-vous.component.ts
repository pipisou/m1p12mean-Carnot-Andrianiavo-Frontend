import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {DisabledTimeConfig, NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DetailService, DeviInsert, Login} from '../../../Models/Interfaces';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {DeviService} from '../../../Services/devi.service';

@Component({
  selector: 'app-rendez-vous',
  imports: [NzModalModule, NzDatePickerModule, CommonModule, FormsModule, NzButtonModule],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css',
  standalone: true
})
export class RendezVousComponent {

  @Input() visibleRendezVous: boolean = false
  // @Input() hideRendezVous:() => void = ()=>{}
  @Input() listSelectedDetailCat: Set<DetailService> = new Set<DetailService>()
  @Input() idVehicule?: string
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeInnerModal: EventEmitter<void> = new EventEmitter<void>();

  hideRendezVous(){
    this.closeInnerModal.emit()
  }

  user: Login

  today = new Date(new Date().setHours(0, 0, 0, 0));

  rendezVous: { dateHeureDebut: Date, dateHeureFin: Date }[] = [];

  loadingInsert: boolean = false

  constructor( private toast: NzMessageService, private devi: DeviService, private modal: NzModalService) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
  }

  disabledDate = (current: Date): boolean => {
    return current < this.today
  };
  dateSelectionnee: Date[] | null = null;
  onOk(result: Date | Date[] | null): void {
    if (Array.isArray(result) && result.length === 2 && result[0] && result[1]) {
      const dateDebut = result[0];
      const dateFin = result[1];
      this.rendezVous.push({ dateHeureDebut:dateDebut, dateHeureFin:dateFin });
      this.dateSelectionnee = [];
    }
  }

  submit(){
    if (!this.user.token){
      this.toast.error("Utilisateur invalide. Veuillez vous reconnecter!", {nzDuration: 10000})
      return
    }
    this.loadingInsert=true
    const deviRend: DeviInsert = {dateDemande: this.rendezVous, taches: Array.from(this.listSelectedDetailCat), vehicule: this.idVehicule ?? null }
    this.devi.addDeviRendezVous({ Authorization: `Bearer ${this.user.token}` }, deviRend).subscribe(
      rep=>{
        this.loadingInsert = false
        this.hideRendezVous()
        this.modal.success({
          nzTitle: 'Demande de Rendez-vous effectuée',
          nzContent: `Votre reference est: <strong class="text-print fs-5 color-purple">${rep.reference}</strong>`,
          nzMaskClosable: false,
          nzAfterClose: this.modalClosed
        })

      },
      error => {
        this.loadingInsert = false
        this.toast.error(error.message, {nzDuration: 5000})
        console.log(error)
      }
    )
  }

  deleteDate(index: number): void{
    if (index >= 0 && index < this.rendezVous.length) {
      this.rendezVous.splice(index, 1);
    }
  }

  disabledTimeRange = (): DisabledTimeConfig => {
    return {
      nzDisabledHours: () => {
        let disabledHours: number[] = [];
        for (let i = 0; i < 24; i++) {
          if (i < 7 || i >= 18) {
            disabledHours.push(i); // Désactiver avant 07h et après 18h
          }
        }
        return disabledHours;
      },
      nzDisabledMinutes: () => [], // Laisse toutes les minutes disponibles
      nzDisabledSeconds: () => []  // Laisse toutes les secondes disponibles
    };
  };

}
