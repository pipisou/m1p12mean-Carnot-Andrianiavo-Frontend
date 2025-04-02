import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShowProjetComponent} from '../show-projet/show-projet.component';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home-mecano',
  imports: [RouterModule, ShowProjetComponent, NzPaginationModule, FormsModule, CommonModule],
  templateUrl: './home-mecano.component.html',
  styleUrl: './home-mecano.component.css'
})
export class HomeMecanoComponent {
  value: number = 0
}
