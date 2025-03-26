import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DetailService, ServiceDetail, Vehicule} from '../Models/Interfaces';
import {apiUrl} from '../Conf/APIURL';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

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
}
