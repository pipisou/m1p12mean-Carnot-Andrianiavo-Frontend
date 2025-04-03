import {Component, Input, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategorieService} from '../../../Services/categorie.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {DetailService, Login} from '../../../Models/Interfaces';
import {NzListModule} from 'ng-zorro-antd/list';


@Component({
  selector: 'app-detail-categorie',
  imports: [CommonModule, NzListModule],
  templateUrl: './detail-categorie.component.html',
  styleUrl: './detail-categorie.component.css',
  standalone: true
})
export class DetailCategorieComponent {
  @Input() categorieId!: string;
  @Output() categorieSelected = new EventEmitter<DetailService>()
  @Input() user!: Login
  @Input() listSelectedCategories: Set<DetailService> = new Set<DetailService>()

  loading: boolean = true
  listDetailService: DetailService[] = []

  setSelectedCategorie(categorie: DetailService){
    this.categorieSelected.emit(categorie);
  }

  exist(cat: DetailService){
    return  Array.from(this.listSelectedCategories).some(item => item._id === cat._id);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['categorieId']) {
      this.getCategories(this.categorieId)
    }
  }

  constructor(private categorieService: CategorieService,  private toast: NzMessageService) {
  }

  getCategories(idCat: string){
    this.loading=true
    this.categorieService.getCategorie({ Authorization: `Bearer ${this.user.token}` }, idCat).subscribe(
      rep=>{
        this.loading = false
        this.listDetailService = rep
      },
      error => {
        this.toast.error(error.message, {nzDuration: 5000})
        this.loading = false
      }
    )
  }
}
