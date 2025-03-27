import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-affiche-devi',
  imports: [NzModalModule, CommonModule, NzButtonModule],
  templateUrl: './affiche-devi.component.html',
  styleUrl: './affiche-devi.component.css'
})
export class AfficheDeviComponent {
  @Input() isVisible: boolean = false
  @Input() listRendezVous = []

  @Output() fonctHide: EventEmitter<void> = new EventEmitter<void>();

  hideRendezVous(){
    this.fonctHide.emit()
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['listRendezVous']){
      console.log(this.listRendezVous)
    }
  }

  //annuler, manao back si defferent de home
  //valider =>mes services=>alefa ilay objet

}
