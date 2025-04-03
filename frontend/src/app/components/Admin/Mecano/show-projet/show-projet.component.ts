import {Component, Input} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {CommonModule} from '@angular/common';
import {DetailService, LoginMecanicien, Mecanicien, RenderVous} from '../../../../Models/Interfaces';

@Component({
  selector: 'app-show-projet',
  imports: [NzCardModule, NzAvatarModule, NzProgressModule, NzToolTipModule, NzPopoverModule, NzIconModule, NzPaginationModule, CommonModule],
  templateUrl: './show-projet.component.html',
  styleUrl: './show-projet.component.css'
})
export class ShowProjetComponent {
  @Input()rendezVous: RenderVous | null = null
  private _task: {_id: string, statut: string, tache: DetailService}[] = []
  mecanicien: LoginMecanicien

  constructor() {
    this.mecanicien = JSON.parse(sessionStorage.getItem("user") || '{}')
  }


  get task(): { _id: string; statut: string; tache: DetailService }[] {
    const g = this.rendezVous
    this._task = []
    if (g) {
      g.taches?.map((e)=> {
        if (e.mecanicien._id.includes(this.mecanicien.mecanicien._id)){
          this._task.push({_id: e._id, statut: e.statut, tache: e.tache})
        }
      })
    }
    return this._task;
  }

  private _statistique: { encours: number; afaire: number; pourcentage: number; terminer: number } = {
    encours: 0,
    afaire: 0,
    pourcentage: 0,
    terminer: 0
  };


  get statistique(){
    let ter=0
    let en = 0
    let a = 0
    if (this.rendezVous?.statut?.toLowerCase().includes('p')){
      this.rendezVous?.taches?.map(({statut})=>{
        if (statut.toLowerCase().includes('ter')){
          ter+=10
        }else if(statut.toLowerCase().includes('cou')){
          en+=5
        }else{
          a+=1
        }
      })
    }
    let pour = 0
    if ((this.rendezVous?.taches?.length ?? 0) > 0) {
      pour=(100*(ter+en))/((this.rendezVous?.taches?.length ?? 0)*10)
    }
    this._statistique={terminer: ter/10, encours: en/5, afaire: a, pourcentage: pour}
    return this._statistique
  }
  paginateTask = 1
  pageAll = 1

  modifPageAll(value: number){
    this.pageAll = value
  }

  modifCurrentPage(value: number){
    this.paginateTask=value
  }

}
