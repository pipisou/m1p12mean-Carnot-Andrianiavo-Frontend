import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategorieDeVehiculeService {
  private apiUrl = `${environment.apiUrl}/categorieDeVehicule`;  // Changez l'URL si nécessaire

  constructor(private http: HttpClient) {}

  // Récupérer toutes les catégories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
    // Récupérer une catégorie par son ID
    getCategoryById(categoryId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${categoryId}`);
    }

  // Ajouter une nouvelle catégorie
  addCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  // Supprimer une catégorie
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${categoryId}`);
  }

  // Modifier une catégorie (si nécessaire)
  editCategory(categoryId: string, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${categoryId}`, category);
  }
}
