import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../Conf/APIURL';
import {DeviInsert} from '../Models/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeviService {
  constructor(private http: HttpClient) { }

  getVehiculeClient(header: { Authorization: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get(`${apiUrl()}vehicule/client`, { headers });
  }

  addDeviRendezVous(header: { Authorization: string }, devi: DeviInsert): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.post(`${apiUrl()}devis/`, devi,{ headers });
  }
}
