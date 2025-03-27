import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../Conf/APIURL';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http: HttpClient) { }

  getEnAttente(header: { Authorization: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<any>(`${apiUrl()}rendezVous/client/en-attente`, { headers });
  }

  getValidateAdmin(header: { Authorization: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<any>(`${apiUrl()}rendezVous/client/valides`, { headers });
  }
}
