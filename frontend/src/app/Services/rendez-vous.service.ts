import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../Conf/APIURL';
import {RenderVous, Vehicule} from '../Models/Interfaces';;
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = `${environment.apiUrl}/rendezvous`;
  constructor(private http: HttpClient) { }

  getEnAttente(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client/en-attente`, { headers });
  }

  getValidateAdmin(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client/valides`, { headers });
  }

  getEncours(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client/present`, { headers });
  }

  getAbsent(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client/absent`, { headers });
  }

  deleteRendezVous(header: { Authorization: string }, id: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.delete<any>(`${apiUrl()}rendezVous/${id}`, { headers });
  }

  modifPlageDate(header: { Authorization: string }, newDates: {dateHeureDebut: Date, dateHeureFin: Date}[], id:string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${apiUrl()}rendezVous/rendezvous/${id}/modifier-dates`, {dateDemande: newDates},{ headers });
  }

  getByID(header: { Authorization: string },id:string): Observable<RenderVous>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous>(`${apiUrl()}rendezVous/${id}`, { headers });
  }

  getAll(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/client`, { headers });
  }

  getAllMecanicien(header: { Authorization: string }): Observable<RenderVous[]>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.get<RenderVous[]>(`${apiUrl()}rendezVous/mecanicien/present`, { headers });
  }

  modifStatutTache(header: { Authorization: string }, idRdv: string, body:{tacheId: string, newStatus: string}): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': header.Authorization,
    });
    return this.http.patch<any>(`${apiUrl()}rendezVous/changesatuts/${idRdv}`,body, { headers });
  }
  downloadPdf(id: string, nom: string) {
    const url =apiUrl()+ 'rendezVous/facture/'+id;

    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const fileURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = nom+'.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
  //Carnot


  // Récupérer tous les rendez-vous
  getAllRendezVous(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Récupérer les rendez-vous en attente
  getRendezVousEnAttente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/en-attente`);
  }

// Récupérer les rendez-vous validés
getRendezVousValides(): Observable<any> {
  return this.http.get(`${this.apiUrl}/valides`);
}
// Récupérer les rendez-vous marqués comme "Présent"
getRendezVousPresents(): Observable<any> {
  return this.http.get(`${this.apiUrl}/present`);
}

getRendezVousPayer(): Observable<any> {
  return this.http.get(`${this.apiUrl}/payer`);
}


// Récupérer les rendez-vous marqués comme "Absent"
getRendezVousAbsents(): Observable<any> {
  return this.http.get(`${this.apiUrl}/absent`);
}

// Récupérer les rendez-vous marqués comme "payer et present"
getRendezPayerPresent(): Observable<any> {
  return this.http.get(`${this.apiUrl}/payer-present`);
}

  // Récupérer un rendez-vous par ID
  getRendezVousById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Ajouter un rendez-vous
  addRendezVous(rendezVous: any): Observable<any> {
    return this.http.post(this.apiUrl, rendezVous);
  }

  // Mettre à jour un rendez-vous
  updateRendezVous(id: string, rendezVous: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, rendezVous);
  }


  // Mettre à jour le statut d'un rendez-vous
  updateStatutRendezVous(id: string, statut: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/statut`, { statut });
  }

  // ✅ Valider un rendez-vous en mettant à jour la date et le statut
  validerRendezVous(id: string, dateChoisie: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/valider/${id}`, { dateChoisie });
  }


  // Mettre à jour uniquement les articlesUtilises d'un rendez-vous
  updatearticlesUtilisesRendezVous(id: string, articlesUtilises: any[]): Observable<any> {
    // Crée l'objet contenant les données à envoyer
    const body = {  articlesUtilises };
  
    // Envoie la requête PUT avec le corps contenant les deux paramètres
    return this.http.put(`${this.apiUrl}/rendezvous/${id}/articlesUtilises`, body);
  }


    // Mettre à jour uniquement les tâches d'un rendez-vous
    updateTachesRendezVous(id: string, taches: any): Observable<any> {
      // Crée l'objet contenant les données à envoyer
      const body = { taches};
    
      // Envoie la requête PUT avec le corps contenant les deux paramètres
      return this.http.put(`${this.apiUrl}/rendezvous/${id}/taches`, body);
    }
  // Générer une facture pour un rendez-vous
generateFacture(id: string): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/facture/${id}`, { responseType: 'blob' });
}
}
