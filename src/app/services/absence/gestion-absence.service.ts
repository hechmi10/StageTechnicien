import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Absence } from '../../models/absence';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionAbsenceService {
  private apiUrl = 'http://localhost:8080/api/absences';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.apiUrl, { headers: this.authService.getAuthHeaders() });
  }

  createAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(`${this.apiUrl}/create-absence`, absence, { headers: this.authService.getAuthHeaders() });
  }

  updateAbsence(absence: Absence): Observable<Absence> {
    return this.http.put<Absence>(`${this.apiUrl}/${absence.id}`, absence, { headers: this.authService.getAuthHeaders() });
  }

  deleteAbsence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.authService.getAuthHeaders() });
  }

  getAbsenceById(id: number) {
    return this.http.get<Absence>(this.apiUrl + "/get-absence-by-id/" + id);
  }

}
