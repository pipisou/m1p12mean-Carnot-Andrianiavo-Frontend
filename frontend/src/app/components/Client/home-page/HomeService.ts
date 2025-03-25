import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private modalState = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalState.asObservable();

  showModal() {
    this.modalState.next(true);
  }

  hideModal() {
    this.modalState.next(false);
  }
}
