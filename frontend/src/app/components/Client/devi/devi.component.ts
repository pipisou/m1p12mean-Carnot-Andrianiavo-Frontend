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

interface Vehicule {
  _id?: string
  immatriculation?: string
  proprietaire?: any
  categorie?: any
}

@Component({
  selector: 'app-devi',
  imports: [NzModalModule, NzToolTipModule, NzTableModule,CommonModule,NzCheckboxModule , NzStepsModule],
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

  constructor(private deviSerice : DeviService, private toast: NzMessageService, private router: Location ) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
    const storedVehicule = sessionStorage.getItem("selectedVehicule");
    this.vehiculeSelected = storedVehicule ? JSON.parse(storedVehicule) : null;
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
}
