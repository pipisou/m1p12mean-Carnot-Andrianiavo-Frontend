import { Component } from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {DeviService} from '../../../Services/devi.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CommonModule} from '@angular/common';

interface Vehicule {
  _id?: string
  immatriculation?: string
  proprietaire?: any
  categorie?: any
}

@Component({
  selector: 'app-devi',
  imports: [NzModalModule, NzToolTipModule, NzTableModule,CommonModule],
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
      priority: 1
    },
  ];

  constructor(private deviSerice : DeviService, private toast: NzMessageService) {
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
        console.log(resp)
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
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
