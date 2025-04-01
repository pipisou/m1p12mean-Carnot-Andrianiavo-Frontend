import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { AfficheDeviComponent } from '../affiche-devi/affiche-devi.component';
import {DetailService, Login, Mecanicien, RenderVous} from '../../../Models/Interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Location } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {QuitterService} from '../../quitter/quitter.service';
import {ModifRendezvousComponent} from '../modif-rendezvous/modif-rendezvous.component';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {AfficheDetailTacheComponent} from '../affiche-detail-tache/affiche-detail-tache.component';

@Component({
  selector: 'app-commande',
  imports: [NzToolTipModule, AfficheDetailTacheComponent, NzPaginationModule, ModifRendezvousComponent, AfficheDeviComponent, CommonModule,NzListModule, NzSelectModule, FormsModule, NzDropDownModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  afficheEnAttent: boolean = false
  commandeServices: RenderVous[] =[]
  user:Login
  id: string | null = null;

  loading= true
  selectedElement: RenderVous | null | undefined
  loadingAll = true

  constructor(private route: ActivatedRoute, private quitter: QuitterService, private routerNav: Router, private router: Location, private rendezVous: RendezVousService,private toast: NzMessageService) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      if (this.id){
        this.selecteByID(this.id)
      }else{
        this.loading=false
        this.afficheEnAttent = true
      }
    });
    this.getAll()
  }

  selecteByID(id: string){
    this.loading = true
    this.rendezVous.getByID({ Authorization: `Bearer ${this.user.token}` },id).subscribe(
      rep=>{
        this.loading=false
        this.afficheEnAttent=false
        this.selectedElement=rep
        this.selected=rep.devis.referenceDevis

        console.log(rep)
      },
      error=>{
        this.loading=false
        this.afficheEnAttent=false
        this.toast.error(error.message,{nzDuration:7000})
      }
    )
  }

  getAll(){
    this.loadingAll = true
    this.rendezVous.getAll({ Authorization: `Bearer ${this.user.token}` }).subscribe(
      rep=>{
        this.commandeServices=rep
        this.loadingAll=false
      },
      error=>{
        this.toast.error(error.message,{nzDuration: 5000})
        this.loadingAll=false
      }
    )
  }

  hideAfficheEnAttent(){
    this.routerNav.navigate(["/client/home"])
    this.afficheEnAttent = false
  }

  selected: string = ''

  // ngDoCheck(){
  //   console.log("changement...")
  // }
  changeSelectedValue(val: any){
    this.loading = true;
    this.routerNav.navigateByUrl("/client/home", { skipLocationChange: true }).then(() => {
      this.routerNav.navigate(["/client/service", val]);
    })
  }

  activeElement: number = 1

  updateActiveElement(value: number){
    this.activeElement = value
  }

  clickDelete(){
    this.quitter.showValidate(()=> this.deletedValidate(this.selectedElement?._id ?? ''),`Voulez-vous vraiment supprimer: ${this.selectedElement?.devis?.referenceDevis}`)
  }

  deletedValidate(id: string ){
    this.loading = true
    this.rendezVous.deleteRendezVous({ Authorization: `Bearer ${this.user.token}` }, id).subscribe(
      rep=>{
        this.commandeServices=[]
        this.getAll()
        this.afficheEnAttent=true
        this.toast.info(rep.message, {nzDuration:5000})
      },
      error => {
        this.toast.info(error.message, {nzDuration:5000})
      }
    )
  }

  tabCurrentDate: { dateHeureDebut: Date, dateHeureFin: Date }[] = []
  redemander(){
    this.loading = true
    this.selectedElement?.dateDemande.map(({dateHeureDebut, dateHeureFin})=>this.tabCurrentDate.push({dateHeureDebut, dateHeureFin}))
    this.rendezVous.modifPlageDate({ Authorization: `Bearer ${this.user.token}` }, this.tabCurrentDate, this.selectedElement?._id ?? '').subscribe(
      rep=>{
        this.loading = false
        this.routerNav.navigateByUrl("/client/home", { skipLocationChange: true }).then(() => {
          this.routerNav.navigate(["/client/service", this.selectedElement?._id]);
        })
      },
      error => {
        this.loading = false
        this.toast.error(error.message, {nzDuration: 5000})
      }
    )
  }
  visibleModifRendezVous = false
  hideModif(){
    this.loading = false
    this.visibleModifRendezVous = false
  }
  showModif(){
    this.loading = true
    this.visibleModifRendezVous = true
  }

  modifier(value : boolean){
    this.loading = true
    this.routerNav.navigateByUrl("/client/home", { skipLocationChange: true }).then(() => {
      this.routerNav.navigate(["/client/service", this.selectedElement?._id]);
    })
  }


  currentPage: number=1
  pageSize = 10;

  formatNumber(value: number): string {
    return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  }

  get paginatedList() {
    let arrayList: { dateHeureDebut: Date; dateHeureFin: Date; _id: string; statut: string; tache: DetailService; mecanicien: Mecanicien }[] | undefined =[]
    if (this.selectedElement?.statut?.toLowerCase().includes('p')){
      arrayList = this.selectedElement?.taches
    }else{
      arrayList=[]
    }
    const start = (this.currentPage - 1) * this.pageSize;
    return arrayList?.slice(start, start + this.pageSize);
  }

  currentPageNonValider = 1

  showImageTache = false
  idClickedTache = ''
  clickedDetail(id: string){
    this.showImageTache = true
    this.idClickedTache = id
  }

  hideTache(){
    this.showImageTache = false
  }
}
