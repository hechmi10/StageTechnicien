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

  login(id:number) {
    return this.http.get<Employee>(this.apiUrl + "/authenticate/" + id);
  }

  loginAdmin(id:number) {
    return this.http.get<Admin>(this.apiUrl + "/authenticate/" + id);
  }

}
