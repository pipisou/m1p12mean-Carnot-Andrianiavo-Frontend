import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailsService {
  private apiUrl = `${environment.apiUrl}/service-details`;

  constructor(private http: HttpClient) {}

  // Récupérer tous les détails de services
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Récupérer un détail de service par son ID
  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Récupérer les détails d'un service spécifique
  getByServiceId(serviceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/service/${serviceId}`);
  }

  // Ajouter un détail de service
  create(serviceDetails: any): Observable<any> {
    return this.http.post(this.apiUrl, serviceDetails);
  }

  // Mettre à jour un détail de service
  update(id: string, serviceDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, serviceDetails);
  }

  // Supprimer un détail de service
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
    // Récupérer toutes les tâches d'un ServiceDetails spécifique
    getTachesByServiceDetailsId(serviceDetailsId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/alltaches/${serviceDetailsId}`);
    }
      // Récupérer les détails d'un service par catégorie
  getByCategorieId(categorieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorie/${categorieId}`);
  }

}
