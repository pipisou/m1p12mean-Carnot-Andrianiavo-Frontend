import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {DisabledTimeConfig, NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {FormsModule} from '@angular/forms';
import {Login} from '../../../Models/Interfaces';
import {RendezVousService} from '../../../Services/rendez-vous.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-modif-rendezvous',
  imports: [NzModalModule, CommonModule, NzButtonModule,NzDatePickerModule, FormsModule],
  templateUrl: './modif-rendezvous.component.html',
  styleUrl: './modif-rendezvous.component.css'
})
export class ModifRendezvousComponent {
  user: Login

  @Input() visibleRendezVous: boolean = false
  @Input() idRendezVous: string = ''
  @Output() fonthideModifRendezVous: EventEmitter<void> = new EventEmitter<void>()
  @Output() onModifValidate: EventEmitter<boolean> = new EventEmitter<boolean>()


  rendezVous: { dateHeureDebut: Date, dateHeureFin: Date }[] = []
  hideModifRendezVous(){
    this.rendezVous = []
    this.fonthideModifRendezVous.emit()
  }
  constructor(private service: RendezVousService,  private toast: NzMessageService) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}');
  }

  deleteDate(index: number): void{
    if (index >= 0 && index < this.rendezVous.length && !this.loadingInsert) {
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
  today = new Date(new Date().setHours(0, 0, 0, 0));
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
  loadingInsert=false


  submit(){
    this.loadingInsert = true
    this.service.modifPlageDate({ Authorization: `Bearer ${this.user.token}` }, this.rendezVous, this.idRendezVous).subscribe(
      rep=>{
        this.loadingInsert = false
        this.hideModifRendezVous()
        this.onModifValidate.emit(true)
      },
      error => {
        this.loadingInsert = false
        this.toast.error(error.message, {nzDuration: 5000})
      }
    )
  }
}
