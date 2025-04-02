import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {QuitterService} from '../../../quitter/quitter.service';

@Component({
  selector: 'app-terminer',
  imports: [RouterModule, NzPaginationModule, FormsModule, CommonModule],
  templateUrl: './terminer.component.html',
  styleUrl: './terminer.component.css'
})
export class TerminerComponent {
  constructor(private router: Router,  private quitter: QuitterService) {
  }

  showValidation(){
    this.quitter.showValidate(()=>{}, 'Voulez-vous prendre votre tache?')
  }
}
