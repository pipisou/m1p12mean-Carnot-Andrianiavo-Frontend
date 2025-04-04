import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/article`; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addArticle(nomArticle: string, categorie: string): Observable<any> {
    return this.http.post(this.apiUrl, { nomArticle, categorie });
  }

  updateArticle(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
