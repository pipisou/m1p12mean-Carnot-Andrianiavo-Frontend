import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "https://backend-deploy-hpnn.onrender.com/"
  constructor(private http: HttpClient) { }

  login(credentials: { email: string; motDePasse: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}client/login`, credentials);
  }
  checkToken(header: { Authorization: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get(`${this.apiUrl}client/me`, { headers });
  }
}
