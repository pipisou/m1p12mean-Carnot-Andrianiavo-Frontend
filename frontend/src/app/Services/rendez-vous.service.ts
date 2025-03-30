import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../Conf/APIURL';
import {RenderVous, Vehicule} from '../Models/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http: HttpClient) { }

  getEnAttente(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client/en-attente`, { headers });
  }

  getValidateAdmin(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client/valides`, { headers });
  }

  getEncours(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client/present`, { headers });
  }

  getAbsent(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client/absent`, { headers });
  }

  deleteRendezVous(header: { Authorization: string }, id: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.delete<any>(`${apiUrl()}rendezVous/${id}`, { headers });
  }

  modifPlageDate(header: { Authorization: string }, newDates: {dateHeureDebut: Date, dateHeureFin: Date}[], id:string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${apiUrl()}rendezVous/rendezvous/${id}/modifier-dates`, {dateDemande: newDates},{ headers });
  }

  getByID(header: { Authorization: string },id:string): Observable<RenderVous>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous>(`${apiUrl()}rendezVous/${id}`, { headers });
  }

  getAll(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client`, { headers });
  }
}
