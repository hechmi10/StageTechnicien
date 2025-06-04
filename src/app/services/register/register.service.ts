import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../../models/admin';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
private apiUrlEmp: string = "http://localhost:8080/api/employee";
  private apiUrlAdmin: string = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  signUpEmployee(emp:Employee) {
    return this.http.post<Employee>(this.apiUrlEmp + "/save-employee",emp);
  }

  signUpAdmin(admin:Admin) {
    return this.http.post<Admin>(this.apiUrlAdmin + "/save-admin",admin);
  }
}
