import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Absence } from '../../models/absence';

@Injectable({
  providedIn: 'root'
})
export class GestionAbsenceService {

  constructor(private http:HttpClient) { }

  private apiUrl:string="http://localhost:8080/api/absence";
  getAbsences() {
    return this.http.get<Absence[]>(this.apiUrl+"/get-all-absences");
  }

  createAbsence(absence: Absence) {
    return this.http.post<Absence>(this.apiUrl+"/create-absence", absence);
  }

  updateAbsence(id:number,absence: Absence) {
    return this.http.put<Absence>(this.apiUrl+"/update-absence/"+id, absence);
  }

  deleteAbsence(id:number) {
    return this.http.delete<Absence>(this.apiUrl+"/delete-absence/"+id);
  }

  getAbsenceById(id: number) {
    return this.http.get<Absence>(this.apiUrl + "/get-absence-by-id/" + id);
  }

}
