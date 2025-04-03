import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzListModule} from 'ng-zorro-antd/list';
import {CommonModule} from '@angular/common';
import {NzCarouselModule} from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-affiche-detail-tache',
  imports: [NzModalModule, NzButtonModule, NzEmptyModule, NzListModule, CommonModule, NzCarouselModule],
  templateUrl: './affiche-detail-tache.component.html',
  styleUrl: './affiche-detail-tache.component.css'
})
export class AfficheDetailTacheComponent {
  @Input() idDetailService: string = ''
  @Input()isVisible: boolean = false
  @Output()hide: EventEmitter<void> = new EventEmitter<void>()

  hideRendezVous(){
    this.hide.emit()
  }

  loading = false
  listLinkImage: string[]=["https://i.gaw.to/content/photos/33/47/334751_2019_Rolls-Royce_Cullinan.jpg?460x287", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoGwh_K_c6nuGtqyo1AG0ZpHKYkLNoz_fYqw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStpovgEEBqmCYqmJ1fGSxgG9SYO8TtTge5_w&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbCVAapXjZDXaF_DI5O6c7Rwtrsk7AztbqQ&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghEFHpIko2sbmF_yVCTYGwJFl5D3lWi2sBQ&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-wNnRZsmzgnjgDq04njqis8eRlddsvEzewg&s"]

  currentImageSelected = 0
}
