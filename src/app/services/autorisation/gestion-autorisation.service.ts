import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autorisation } from '../../models/autorisation';

@Injectable({
  providedIn: 'root'
})
export class GestionAutorisationService {
  private apiUrl: string = "http://localhost:8080/api/autorisation";

  constructor(private http: HttpClient) { }

  getAutorisation() {
    return this.http.get<Autorisation[]>(this.apiUrl + "/get-all-autorisations");
  }

  createAutorisation(autorisation: Autorisation) {
    return this.http.post<Autorisation>(this.apiUrl + "/create-autorisation", autorisation);
  }

  updateAutorisation(id: number, autorisation: Autorisation) {
    return this.http.put<Autorisation>(this.apiUrl + "/update-autorisation/" + id, autorisation);
  }

  deleteAutorisation(id: number) {
    return this.http.delete<Autorisation>(this.apiUrl + "/delete-autorisation/" + id);
  }

  getAutorisationById(id: number) {
    return this.http.get<Autorisation>(this.apiUrl + "/get-autorisation-by-id/" + id);
  }

}
