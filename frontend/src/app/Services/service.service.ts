import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/service`;

  constructor(private http: HttpClient) {}

  // Récupérer tous les services
  getServices(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Récupérer un service par son ID
  getServiceById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Ajouter un service
  addService(service: any): Observable<any> {
    return this.http.post(this.apiUrl, service);
  }

  // Mettre à jour un service
  updateService(id: string, service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, service);
  }

  // Supprimer un service
  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
