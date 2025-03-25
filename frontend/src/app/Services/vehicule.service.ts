import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../Conf/APIURL';
import {Vehicule} from '../Models/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

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
}
