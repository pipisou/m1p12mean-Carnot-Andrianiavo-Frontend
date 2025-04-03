import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = `${environment.apiUrl}/taches`;

  constructor(private http: HttpClient) {}

  // Ajouter une tâche
  addTache(tache: any): Observable<any> {
    return this.http.post(this.apiUrl, tache);
  }

  // Récupérer toutes les tâches
  getTaches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer une tâche par ID
  getTacheById(tacheId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${tacheId}`);
  }

  // Modifier une tâche
  editTache(tacheId: string, tache: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${tacheId}`, tache);
  }

  // Supprimer une tâche
  deleteTache(tacheId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${tacheId}`);
  }
}
