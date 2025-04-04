import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DetailService, ServiceDetail, Vehicule} from '../Models/Interfaces';
import {apiUrl} from '../Conf/APIURL';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = `${environment.apiUrl}/categorie`;
  constructor(private http: HttpClient) { }

  getServices(header: { Authorization: string }, idCategorie: string | undefined): Observable<ServiceDetail[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<ServiceDetail[]>(`${apiUrl()}service-details/categorie/${idCategorie}`, { headers });
  }

  getCategorie(header: { Authorization: string }, idCategorie: string | undefined): Observable<DetailService[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<DetailService[]>(`${apiUrl()}service-details/alltaches/${idCategorie}`, { headers });
  }
//Carnot

getCategories(): Observable<any> {
  return this.http.get(this.apiUrl);
}

getCategoryById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

addCategory(nomCategorie: string): Observable<any> {
  return this.http.post(this.apiUrl, { nomCategorie });
}

updateCategory(id: string, nomCategorie: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, { nomCategorie });
}

deleteCategory(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}




}
