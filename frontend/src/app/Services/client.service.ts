import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../Conf/APIURL';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  addClient(client:{ nom: string, prenom: string, email: string, telephone: string, motDePasse: string }): Observable<any>{
    return this.http.post<any>(`${apiUrl()}client/register`,client );
  }
}
