import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MecanicienService {
  private apiUrl = `${environment.apiUrl}/mecanicien`;

  constructor(private http: HttpClient) {}

  getMecaniciens(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getMecanicienById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addMecanicien(mecanicien: any): Observable<any> {
    return this.http.post(this.apiUrl, mecanicien);
  }

  updateMecanicien(id: string, mecanicien: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mecanicien);
  }

  deleteMecanicien(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
