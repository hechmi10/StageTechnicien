import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employee';

  constructor(private http:HttpClient) { }

  getEmployees() {
    return this.http.get<Employee[]>(`${this.apiUrl}/get-all-employees`);
  }

  getEmployeeById(id: number) {
    return this.http.get<Employee>(`${this.apiUrl}/get-employee/${id}`);
  }

  createEmployee(employee: Employee) {
    return this.http.post<Employee>(`${this.apiUrl}/create-employee`, employee);
  }

  updateEmployee(id: number, employee: Employee) {
    return this.http.put<Employee>(`${this.apiUrl}/update-employee/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/delete-employee/${id}`);
  }
}
