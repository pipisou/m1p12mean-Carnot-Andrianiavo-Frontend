import {Component} from '@angular/core';
import {VehiculeService} from '../../Services/vehicule.service';
import {CategorieDeVehicule, Login, Vehicule} from '../../Models/Interfaces';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CommonModule} from '@angular/common';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';

@Component({
  selector: 'app-vehicule',
  imports: [NzModalModule, NzToolTipModule, NzTableModule,CommonModule, NzIconModule, NzButtonModule, FormsModule, NzSelectModule],
  templateUrl: './vehicule.component.html',
  styleUrl: './vehicule.component.css',
  standalone: true
})
export class VehiculeComponent {

  listOfColumn = [
    {
      title: 'Immatriculation',
      compare: (a: Vehicule, b: Vehicule) => (a.immatriculation || '').localeCompare(b.immatriculation || ''),
      priority: false
    },
    {
      title: 'categorie',
      compare: (a: Vehicule, b: Vehicule) => ((a?.categorie?.nom || '').localeCompare(b?.categorie?.nom || '')),
      priority: 1
    },
  ];
  loading: boolean = false
  listVehicule: Vehicule[] = []
  listDeletedVehicule: Set<string> = new Set<string>()
  user: Login

  isVisible: boolean = false
  allCategorie: CategorieDeVehicule[] = []
  newCat: Vehicule = {_id: '', categorie: {nom: '', description: ''}, immatriculation: ''}

  constructor(private vehiculeService: VehiculeService, private router: Router, private toast: NzMessageService) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
  }
  ngOnInit(){
    if (!this.user.token){
      this.router.navigate(["/login"])
    }else{
      this.getAllVehicule()
    }
  }
  getAllVehicule(){
    this.loading = true;
    this.vehiculeService.getVehiculeClient({ Authorization: `Bearer ${this.user.token}` }).subscribe(
      resp=>{
        this.loading = false
        this.listVehicule = resp
      },
      error => {
        this.loading = false
        this.toast.error("Erreur de chargement de données",{ nzDuration: 5000 });
      }
    )
  }
  deleteVehicule(idVehicule: Vehicule){
    this.listDeletedVehicule.add((idVehicule._id))
    this.vehiculeService.deleteVehicule({ Authorization: `Bearer ${this.user.token}`}, idVehicule._id).subscribe(
      rep=>{
        this.listVehicule = this.listVehicule.filter(v => v._id !== idVehicule._id);
        this.listDeletedVehicule.delete((idVehicule._id))
      },
      error => {
        this.toast.error(`Erreur lors de suppression de Vehicule ${idVehicule.immatriculation}`, {nzDuration: 5000})
        this.listDeletedVehicule.delete((idVehicule._id))
      }
    )
  }

  hideModal(){
    this.isVisible = false
    this.newCat = {_id: '', categorie: {nom: '', description: ''}, immatriculation: ''}
  }

  showModal(){
    this.isVisible = true
    if (this.allCategorie.length ===0){
      this.getAllCat()
    }else{
      this.newCat.categorie=this.allCategorie[0]
    }
  }
  getAllCat(){
    this.vehiculeService.getAllCategories({ Authorization: `Bearer ${this.user.token}` }).subscribe(
      resp=>{
        this.allCategorie=resp
        if (resp.length>0){
          this.newCat.categorie = resp[0]
        }
      },
      error => {
        this.toast.error("Erreur lors de l'initialisation de Categorie Vehicule", {nzDuration: 5000})
      }
    )
  }

  loadingInsert: boolean = false
  submit(){
    if (this.newCat.immatriculation.trim().length>0 && this.newCat.categorie){
      this.loadingInsert = true
      this.vehiculeService.addVehicule({ Authorization: `Bearer ${this.user.token}`}, this.newCat).subscribe(
        rep=>{
          this.loadingInsert=false
          this.listVehicule.push({...this.newCat,_id: rep.vehicule._id})
          this.hideModal()
        },
        error => {
          this.toast.error(error.message, {nzDuration: 5000})
          this.loadingInsert=false
        }
      )
    }else{
      this.toast.warning("Verifiez vos données", {nzDuration: 5000})
    }
  }
}
