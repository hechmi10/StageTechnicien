import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { Admin } from '../../models/admin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrlEmp: string = "http://localhost:8080/api/employee";
  private apiUrlAdmin: string = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  loginEmployee(id:number) {
    return this.http.get<Employee>(this.apiUrlEmp + "/get-employee-by-id/" + id);
  }

  loginAdmin(id:number) {
    return this.http.get<Admin>(this.apiUrlAdmin + "/get-admin-by-id/" + id);
  }

}
