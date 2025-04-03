import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = `${environment.apiUrl}/absence`;

  constructor(private http: HttpClient) {}

  getAbsences(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAbsencesByMecanicienId(mecanicienId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${mecanicienId}`);
  }

  addAbsence(absence: any): Observable<any> {
    const mecanicienId = absence.mecanicien; 
    return this.http.post(`${this.apiUrl}/${mecanicienId}`, absence);
  }

  deleteAbsence(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
