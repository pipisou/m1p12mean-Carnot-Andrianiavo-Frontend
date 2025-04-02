import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from './Conf/APIURL';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  login(credentials: { email: string; motDePasse: string }): Observable<any> {
    return this.http.post(`${apiUrl()}client/login`, credentials);
  }
  checkToken(header: { Authorization: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get(`${apiUrl()}client/me`, { headers });
  }
  loginMecanicien(credentials: { email: string; motDePasse: string }): Observable<any>{
    return this.http.post(`${apiUrl()}mecanicien/login`, credentials);
  }
}
