import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../../models/admin';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
private apiUrl: string = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  signUp(emp:Employee) {
    if(emp.role === 'ADMIN') {
      return this.http.post<Admin>(this.apiUrl + "/register", emp);
    }
    return this.http.post<Employee>(this.apiUrl + "/register",emp);
  }
}
