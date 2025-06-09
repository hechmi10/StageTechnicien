import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee';
import { Admin } from '../../models/admin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) {}

  login(req: { email: string, password: string }): Observable<{ token: string, user: Employee | Admin }> {
    return this.http.post<{ token: string, user: Employee | Admin }>(`${this.apiUrl}/authenticate`, req);
  }
}