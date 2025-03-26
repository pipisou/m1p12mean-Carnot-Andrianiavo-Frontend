import { Component } from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {DeviService} from '../../../Services/devi.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CommonModule} from '@angular/common';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import { Location } from '@angular/common';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {DetailCategorieComponent} from '../detail-categorie/detail-categorie.component';
import {VehiculeService} from '../../../Services/vehicule.service';
import {CategorieDeVehicule, DetailService, ServiceDetail, Vehicule} from '../../../Models/Interfaces';
import {FormsModule} from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CategorieService} from '../../../Services/categorie.service';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {Router} from '@angular/router';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker'

@Component({
  selector: 'app-devi',
  imports: [NzModalModule, NzDatePickerModule, NzPaginationModule, NzListModule, NzToolTipModule, NzTableModule,CommonModule,NzCheckboxModule , NzStepsModule, DetailCategorieComponent, FormsModule, NzSelectModule, NzButtonModule],
  templateUrl: './devi.component.html',
  styleUrl: './devi.component.css',
  standalone: true
})
export class DeviComponent {
  isVisible = false;
  loading = true;
  user : any;
  vehiculeSelected : Vehicule | null = null;
  listVehicule: Vehicule[] = []

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

  listCategorie: ServiceDetail[]=[]
  listSelectedCategories: Set<string> = new Set<string>()
  nextElement: Set<string> = new Set<string>()
  current: any = null
  private _step: number = 0;

  loadingCat: boolean = true
  listSelectedDetailCat: Set<DetailService> = new Set<DetailService>()

  set step(value: number) {
    this._step = value;
    if (this._step ===1){
      this.getAllCategorieService()
    }

    if (this._step ===3){
      //validation et prendre rendez-vous
    }

    if (this._step === 2) {
      if (this.listSelectedCategories.size>0){
        const firstElement = this.listSelectedCategories.values().next().value;
        this.current = this.listCategorie.find((e) => e._id === firstElement);
        if (typeof firstElement === "string") {
          this.nextElement.add(firstElement);
        }
      }
    } else {
      this.current = null;
      this.nextElement.clear();
    }
    if(this._step<2){
      this.listSelectedDetailCat.clear()
    }
  }
  getAllCategorieService(){
    this.loadingCat = true
    if (this.vehiculeSelected){
      this.categorieService.getServices({ Authorization: `Bearer ${this.user.token}` }, this.vehiculeSelected?.categorie._id).subscribe(
        rep=>{
          this.listCategorie=rep
          this.loadingCat = false
        },
        error => {
          this.toast.error(error.message,{nzDuration: 5000})
          this.loadingCat = false
        }
      )
    }
  }

  get step(): number {
    return this._step;
  }

  constructor(private categorieService: CategorieService, private deviSerice : DeviService, private vehiculeService: VehiculeService, private toast: NzMessageService, private router: Location , private navigate: Router) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
    const storedVehicule = sessionStorage.getItem("selectedVehicule");
    this.vehiculeSelected = storedVehicule ? JSON.parse(storedVehicule) : null;
    if (this.vehiculeSelected){
      this.step=1
    }else {
      this.step=0
    }
    this.current = null
  }

  setSelectedCategorie(categorie: string){
    if (this.listSelectedCategories.has(categorie)){
      this.listSelectedCategories.delete(categorie)
    }else{
      this.listSelectedCategories.add(categorie)
    }
  }


  ngOnInit(){
      if (this.user.token){
          if (!this.vehiculeSelected){
              this.showModal()
          }
      }
  }

  getAllVehicule(){
    this.loading = true;
    this.deviSerice.getVehiculeClient({ Authorization: `Bearer ${this.user.token}` }).subscribe(
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

  showModal(): void {
    this.isVisible = true;
    this.getAllVehicule()
  }


  handleOk(): void {
    if (this.vehiculeSelected){
      this.isVisible = false;
      sessionStorage.setItem("selectedVehicule", JSON.stringify(this.vehiculeSelected))
      this.step = 1
      this.current = null
      this.listSelectedCategories.clear()
    }else{
      this.toast.warning("Veillez selectionner un vehicule",{ nzDuration: 5000 })
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.router.back()
  }

  setVehiculeSelected(vehicule: Vehicule){
    this.vehiculeSelected = vehicule;
  }

  nextLink(){
    this.step=2
  }

  getNextElementLoop(set: Set<string>, currentElement: string): string {
    const array = Array.from(set);
    const index = array.indexOf(currentElement);

    return index >=0 && index<array.length-1 ? array[(index + 1)] : array[0];
  }

  nextDetail(){
    if (this.current){
      const next = this.getNextElementLoop(this.listSelectedCategories, this.current._id)

      if (this.nextElement.size<this.listSelectedCategories.size){
        this.current = this.listCategorie.find((e) => e._id === next);
        this.nextElement.add(next);
      }else{
        this.step=3
      }
    }else{
      this.step = 1
    }
  }

  getPrevElement(set: Set<string>, currentElement: string): string {
    const array = Array.from(set);
    const index = array.indexOf(currentElement);
    return index > 0 ? array[index - 1] : array[array.length - 1];
  }

  prevDetail(){
    if (this.current){
      if (this.nextElement.size===1){
        this.step = 1
        return
      }
      const prev = this.getPrevElement(this.nextElement, this.current._id)
      this.nextElement.delete(this.current._id)
      this.current=this.listCategorie.find((e) => e._id === prev)
    }else{
      this.step = 1
    }
  }



  visibleAdd:boolean = false
  allCategorie: CategorieDeVehicule[] = []
  newCat: Vehicule = {_id: '', categorie: {nom: '', description: ''}, immatriculation: ''}


  hideModal(){
    this.visibleAdd = false
    this.newCat = {_id: '', categorie: {nom: '', description: ''}, immatriculation: ''}
  }

  showModalAdd(){
    this.visibleAdd = true
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

  receiveSelectedDetailsService(idCategorie: DetailService){
    const objToDelete = Array.from(this.listSelectedDetailCat).find(item => item._id === idCategorie._id);
    if (objToDelete) {
      this.listSelectedDetailCat.delete(objToDelete);
    }else{
      this.listSelectedDetailCat.add(idCategorie);
    }
  }
  currentPage: number=1
  pageSize = 10;
  get paginatedList() {
    const arrayList = Array.from(this.listSelectedDetailCat);
    const start = (this.currentPage - 1) * this.pageSize;
    return arrayList.slice(start, start + this.pageSize);
  }
  formatNumber(value: number): string {
    return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  }
  totalHeure() {
    const  prixHeur={prix: 0, heureMin: 0, heureMax: 0}
    for (const item of this.listSelectedDetailCat) {
      prixHeur.prix+=item.prix
      prixHeur.heureMin+=(item.tempsEstime-(item.tempsEstime*(item.marge/100)))
      prixHeur.heureMax+=(item.tempsEstime+(item.tempsEstime*(item.marge/100)))
    }
    return prixHeur
  }

  navigationHome(){
    sessionStorage.removeItem("selectedVehicule")
    this.navigate.navigate(["/client/home"])
  }

  visibleRendezVous: boolean = false

  showVisibleRendezVous(){
    this.visibleRendezVous = true
  }

  hideRendezVous(){
    this.visibleRendezVous = false
  }

  // ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  //
  // onChange(result: Date[]): void {
  //   console.log('From: ', result[0], ', to: ', result[1]);
  // }

  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }
}
