import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { Admin } from '../../models/admin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  login(req:{ email: string, password: string }) {
    return this.http.post<Employee>(this.apiUrl + "/authenticate",req);
  }

  loginAdmin(req:{ email: string, password: string }) {
    return this.http.post<Admin>(this.apiUrl + "/authenticate",req);
  }

}
