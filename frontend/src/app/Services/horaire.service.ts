import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {
  private apiUrl = `${environment.apiUrl}/horaire`;

  constructor(private http: HttpClient) {}

  getHoraire(mecanicienId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${mecanicienId}`);
  }

  updateHoraire(mecanicienId: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${mecanicienId}`, data);
  }
}
