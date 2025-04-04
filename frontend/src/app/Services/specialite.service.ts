import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  private apiUrl = `${environment.apiUrl}/specialite`;

  constructor(private http: HttpClient) {}

  getSpecialites(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addSpecialite(specialite: any): Observable<any> {
    return this.http.post(this.apiUrl, specialite);
  }

  updateSpecialite(id: string, specialite: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, specialite);
  }

  deleteSpecialite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
