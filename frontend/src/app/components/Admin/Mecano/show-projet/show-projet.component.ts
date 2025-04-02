import {Component, Input} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-show-projet',
  imports: [NzCardModule, NzAvatarModule, NzProgressModule, NzToolTipModule, NzPopoverModule, NzIconModule, NzPaginationModule, CommonModule],
  templateUrl: './show-projet.component.html',
  styleUrl: './show-projet.component.css'
})
export class ShowProjetComponent {
  @Input()valeur=0
}
