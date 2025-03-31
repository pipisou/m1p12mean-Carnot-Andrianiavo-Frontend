import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RendezVousService } from '../../../Services/rendez-vous.service';
import { AfficheDeviComponent } from '../affiche-devi/affiche-devi.component';
import {Login, RenderVous} from '../../../Models/Interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Location } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande',
  imports: [NzToolTipModule, AfficheDeviComponent, CommonModule,NzListModule, NzSelectModule, FormsModule],
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

  constructor(private route: ActivatedRoute, private routerNav: Router, private router: Location, private rendezVous: RendezVousService,private toast: NzMessageService) {
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
    this.router.back()
    this.afficheEnAttent = false
  }

  selected: string = ''

  /*changeSelectedValue(val: any){
    this.loading = true
    this.routerNav.navigate(["/client/service", val])//il y a un probleme avec ceci, le system de loading dans   selecteByID(id: string) ne marche pas
  }
  ngDoCheck(){
    console.log("changement...")
  }*/
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
}
