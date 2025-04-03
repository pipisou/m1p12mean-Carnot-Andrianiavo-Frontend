import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShowProjetComponent} from '../show-projet/show-projet.component';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RenderVous} from '../../../../Models/Interfaces';
import {NzEmptyModule} from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-home-mecano',
  imports: [RouterModule, ShowProjetComponent, NzPaginationModule, FormsModule, CommonModule, NzEmptyModule],
  templateUrl: './home-mecano.component.html',
  styleUrl: './home-mecano.component.css'
})
export class HomeMecanoComponent {
  @Input() listRendezVous: RenderVous[] = []
  currentPage = 1
  modifCurrentPage(value: number){
    this.currentPage=value
  }
}
