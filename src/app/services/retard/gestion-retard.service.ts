import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Retard } from '../../models/retard';

@Injectable({
  providedIn: 'root'
})
export class GestionRetardService {
  private apiUrl: string = "http://localhost:8080/api/retard";

  constructor(private http: HttpClient) { }

  getRetard() {
    return this.http.get<Retard[]>(this.apiUrl + "/get-all-retards");
  }

  createRetard(retard: Retard) {
    return this.http.post<Retard>(this.apiUrl + "/save-retard", retard);
  }

  updateRetard(id: number, retard: Retard) {
    return this.http.put<Retard>(this.apiUrl + "/update-retard/" + id, retard);
  }

  deleteRetard(id: number) {
    return this.http.delete<Retard>(this.apiUrl + "/delete-retard/" + id);
  }

  getRetardById(id: number) {
    return this.http.get<Retard>(this.apiUrl + "/get-retard-by-id/" + id);
  }

}
