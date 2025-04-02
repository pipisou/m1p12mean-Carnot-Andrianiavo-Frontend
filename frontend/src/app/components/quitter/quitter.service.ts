import { Injectable } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuitterService {

  constructor(private modal: NzModalService, private routeur: Router) { }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Voulez-vous vraimment quitter votre espace?</i>',
      nzOkText: 'Valider',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.routeur.navigate(['/bienvenu']).then(()=>sessionStorage.clear())
        return
      }
    });
  }

  showValidate(callback: () => void, message: string): void {
    this.modal.confirm({
      nzTitle: `<i>${message}</i>`,
      nzOkText: 'Valider',
      nzOkType: 'primary',
      nzOnOk: () => {
        callback()
      },
      nzWidth: '30rem',
      nzIconType: 'close-circle',
    });
  }
}
