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

interface Vehicule {
  _id?: string
  immatriculation?: string
  proprietaire?: any
  categorie?: any
}

@Component({
  selector: 'app-devi',
  imports: [NzModalModule, NzToolTipModule, NzTableModule,CommonModule,NzCheckboxModule , NzStepsModule, DetailCategorieComponent],
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

  listCategorie = [
    {id: 1, nom: 'Mécanique Générale'},
    {id: 2, nom: ' Système de Transmission'},
    {id: 3, nom: 'Système de Freinage'},
    {id: 4, nom: 'Suspension et Direction'},
    {id: 5, nom: 'Système Électrique et Électronique'},
    {id: 6, nom: 'Climatiseur et Chauffage'},
    {id: 7, nom: 'Système d’Échappement'},
    {id: 8, nom: 'Pneumatiques'},
    {id: 9, nom: 'Carrosserie et Peinture'},
    {id: 10, nom: 'Vitrage et Accessoires'},
  ]
  listSelectedCategories: Set<number> = new Set<number>()
  nextElement: Set<number> = new Set<number>()
  current: any = null
  private _step: number = 0;

  set step(value: number) {
    this._step = value;

    if (this._step === 2) {
      const firstElement = this.listSelectedCategories.values().next().value;

      if (firstElement !== undefined) {
        this.current = this.listCategorie.find((e) => e.id === firstElement);
        if (typeof firstElement === "number") {
          this.nextElement.add(firstElement);
        }
      }
    } else {
      this.current = null;
      this.nextElement.clear();
    }
  }

  get step(): number {
    return this._step;
  }

  constructor(private deviSerice : DeviService, private toast: NzMessageService, private router: Location ) {
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

  setSelectedCategorie(categorie: number){
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

  getNextElementLoop(set: Set<number>, currentElement: number): number {
    const array = Array.from(set);
    const index = array.indexOf(currentElement);

    return index !== -1 ? array[(index + 1) % array.length] : array[0];
  }

  nextDetail(){
    if (this.current){
      const first = this.listSelectedCategories.values().next().value;
      const next = this.getNextElementLoop(this.listSelectedCategories, this.current.id)

      if (first!==next){
        this.current = this.listCategorie.find((e) => e.id === next);
        this.nextElement.add(next);
      }else{
        this.step=3
      }
    }else{
      this.step = 1
    }
  }

  getPrevElement(set: Set<number>, currentElement: number): number {
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
      const prev = this.getPrevElement(this.nextElement, this.current.id)
      this.nextElement.delete(prev)
      this.current=this.listCategorie.find((e) => e.id === prev)

    }else{
      this.step = 1
    }
  }
}
