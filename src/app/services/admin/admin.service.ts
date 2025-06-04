import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl: string = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  getAdmins() {
    return this.http.get<Admin[]>(this.apiUrl + "/get-all-admins");
  }
  createAdmin(admin: Admin) {
    return this.http.post<Admin>(this.apiUrl + "/create-admin", admin);
  }
  updateAdmin(id: number, admin: Admin) {
    return this.http.put<Admin>(this.apiUrl + "/update-admin/" + id, admin);
  }
  deleteAdmin(id: number) {
    return this.http.delete<Admin>(this.apiUrl + "/delete-admin/" + id);
  }
  getAdminById(id: number) {
    return this.http.get<Admin>(this.apiUrl + "/get-admin-by-id/" + id);
  }
}
