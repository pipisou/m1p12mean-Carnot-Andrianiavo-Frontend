import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentCommandeService {
  private commandeSource = new BehaviorSubject<any>(null);
  currentCommande$ = this.commandeSource.asObservable();
  constructor() { }

  updateCommande(commande: any) {
    this.commandeSource.next(commande);
  }
}
