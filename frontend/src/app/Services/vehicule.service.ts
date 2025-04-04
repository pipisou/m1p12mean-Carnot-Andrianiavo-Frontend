import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../Conf/APIURL';
import {CategorieDeVehicule, Vehicule} from '../Models/Interfaces';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = `${environment.apiUrl}/vehicule`; // Remplacez par l'URL de votre API
  constructor(private http: HttpClient) { }

  getVehiculeClient(header: { Authorization: string }): Observable<Vehicule[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<Vehicule[]>(`${apiUrl()}vehicule/client`, { headers });
  }

  deleteVehicule(header: { Authorization: string }, id: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.delete(`${apiUrl()}vehicule/${id}`, { headers });
  }

  getAllCategories(header: { Authorization: string }): Observable<CategorieDeVehicule[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<CategorieDeVehicule[]>(`${apiUrl()}categorieDeVehicule/`, { headers });
  }

  addVehicule(header: { Authorization: string }, newCar: Vehicule): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${apiUrl()}vehicule/`, newCar,{ headers });
  }

//Carnot

  // Méthode pour récupérer tous les véhicules d'un client
  getVehiculesByClientId(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}`);
  }
  

}
