import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {RenderVous} from '../../../Models/Interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-affiche-devi',
  imports: [NzModalModule, CommonModule, NzButtonModule, NzEmptyModule],
  templateUrl: './affiche-devi.component.html',
  styleUrl: './affiche-devi.component.css'
})
export class AfficheDeviComponent {
  @Input() isVisible: boolean = false
  @Input() listRendezVous: RenderVous[] = []

  @Output() fonctHide: EventEmitter<void> = new EventEmitter<void>();

  hideRendezVous(){
    this.fonctHide.emit()
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['listRendezVous']){
    }
  }

  constructor(private router: Router) {
  }
  navigateCommandeClicked(clickedCommande: RenderVous){
    this.router.navigate(["/client/service", clickedCommande._id])
  }

}
