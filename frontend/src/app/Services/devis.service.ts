import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = `${environment.apiUrl}/devis`;

  constructor(private http: HttpClient) {}

  // Ajouter un devis
  addDevis(devis: any): Observable<any> {
    return this.http.post(this.apiUrl, devis);
  }

  // Récupérer tous les devis
  getDevis(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un devis par ID
  getDevisById(devisId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${devisId}`);
  }

  // Modifier un devis
  editDevis(devisId: string, devis: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${devisId}`, devis);
  }

  // Supprimer un devis
  deleteDevis(devisId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${devisId}`);
  }

    // Récupérer les devis pour un serviceDetails spécifique avec client == null
    getDevisByServiceDetailsAndNoClient(serviceDetailsId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/getalldevisServicedetails/${serviceDetailsId}`);
    }
}
