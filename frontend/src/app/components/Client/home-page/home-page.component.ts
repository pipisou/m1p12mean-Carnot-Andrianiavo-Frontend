import { Component } from '@angular/core';
import {DetailService, Login, RenderVous} from '../../../Models/Interfaces';
import {VehiculeComponent} from '../../vehicule/vehicule.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {RendezVousComponent} from '../rendez-vous/rendez-vous.component';
import {Router} from '@angular/router';
import {QuitterService} from '../../quitter/quitter.service';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { AfficheDeviComponent } from '../affiche-devi/affiche-devi.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import {AfficheDetailTacheComponent} from '../affiche-detail-tache/affiche-detail-tache.component';
import {NzProgressModule} from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-home-page',
  imports: [VehiculeComponent, NzProgressModule, AfficheDetailTacheComponent, NzPaginationModule, NzListModule, NzModalModule, CommonModule, RendezVousComponent, AfficheDeviComponent, NzIconModule, NzEmptyModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true
})
export class HomePageComponent {
  user: Login
  isVisible: boolean = false
  listSelectedDetailCat: Set<DetailService> = new Set<DetailService>()
  currentSelected: number=0
  constructor( private router: Router, private quitter: QuitterService, private rendezVous: RendezVousService, private toast: NzMessageService) {
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

  showConfirm(){
    this.quitter.showConfirm()
  }
  selectedIndex=1
  tabSelected: RenderVous | null = null;
  ngOnInit(){
    this.getAllAttente()
    this.getAllValidate()
    this.getEncours()
  }
  afficheEnAttent: boolean = false
  tabAll: RenderVous[][] =[[],[],[],[]]
  loadingAttente = true
  getAllAttente(){
    this.loadingAttente = true
    this.rendezVous.getEnAttente({ Authorization: `Bearer ${this.user.token}` }).subscribe(
      rep=>{
        this.tabAll[2]=rep
        this.loadingAttente=false
      },
      error=>{
        console.log(error.message)
        this.loadingAttente=false
      }
    )
  }

  loadingValidate = true

  getAllValidate(){
    this.loadingValidate = true
    this.rendezVous.getValidateAdmin({ Authorization: `Bearer ${this.user.token}` }).subscribe(
      rep=>{
        this.tabAll[1]=rep
        this.loadingValidate=false
      },
      error=>{
        console.log(error.message)
        this.loadingValidate=false
      }
    )
  }

  loadingEncours = true
  getEncours(){
    this.loadingEncours = true
    this.rendezVous.getEncours({ Authorization: `Bearer ${this.user.token}` }).subscribe(
      rep=>{
        this.tabAll[0]=rep
        this.loadingEncours=false
        this.tabSelected=this.tabAll[0][this.selectedIndex-1]
      },
      error=>{
        this.toast.error(error.message, {nzDuration: 5000})
        this.loadingEncours=false
      }
    )
  }
  isFacture = false
  showAfficheEnAttent(selected: number){
    if (selected===3){
      this.isFacture = true
    }else {
      this.isFacture = false
    }
    this.currentSelected = selected
    this.afficheEnAttent = true
  }
  hideAfficheEnAttent(){
    this.afficheEnAttent = false
  }

  navigateCommandeClicked(clickedCommande: RenderVous){
    this.router.navigate(["/client/service", clickedCommande._id])
  }

  changeIndexSelected(pageIndex: number){
    this.selectedIndex=pageIndex
    this.tabSelected=this.tabAll[0][this.selectedIndex-1]
  }


  showImageTache = false
  idClickedTache = ''
  clickedDetail(id: string){
    this.showImageTache = true
    this.idClickedTache = id
  }

  hideTache(){
    this.showImageTache = false
  }

  getPourcentage(objRendezVous: RenderVous){
    let ter=0
    let en = 0
    let a = 0
    objRendezVous?.taches?.map(({statut})=>{
      if (statut.toLowerCase().includes('ter')){
        ter+=10
      }else if(statut.toLowerCase().includes('cou')){
        en+=5
      }else{
        a+=1
      }
    })
    let pour = 0
    if ((objRendezVous?.taches?.length ?? 0) > 0) {
      pour=(100*(ter+en))/((objRendezVous?.taches?.length ?? 0)*10)
    }
    return pour
  }

  private _facturation: RenderVous[] = []

  get facturation(){
    this._facturation = []
    this.tabAll[0].map((element)=>{
      if (this.getPourcentage(element)===100){
        this._facturation.push(element)
      }
    })
    this.tabAll[3]=this._facturation
    return this._facturation
  }
}
