import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BeneficeService {
  private apiUrl = `${environment.apiUrl}/stats`;

  constructor(private http: HttpClient) {}

  // Récupérer le bénéfice annuel
  getBeneficeAnnuel(annee: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/benefice-annuel/${annee}`);
  }

  // Récupérer le détail d’un mois
  getDetailMois(annee: number, mois: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/benefice-mensuel/${annee}/${mois}`);
  }
}
