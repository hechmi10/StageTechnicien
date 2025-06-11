import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conge } from '../../models/conge';

@Injectable({
  providedIn: 'root'
})
export class GestionCongeService {

  private apiUrl: string = "http://localhost:8080/api/conge";
  constructor(private http: HttpClient) { }

  getConge() {
    return this.http.get<Conge[]>(this.apiUrl + "/get-all-conges");
  }

  createConge(conge: Conge) {
    return this.http.post<Conge>(this.apiUrl + "/save-conge", conge);
  }

  updateConge(id: number, conge: Conge) {
    return this.http.put<Conge>(this.apiUrl + "/update-conge/" + id, conge);
  }

  deleteConge(id: number) {
    return this.http.delete<Conge>(this.apiUrl + "/delete-conge/" + id);
  }

  getCongeById(id: number) {
    return this.http.get<Conge>(this.apiUrl + "/get-conge-by-id/" + id);
  }

}
