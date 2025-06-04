import { Component } from '@angular/core';
import { Employee } from '../models/employee';
import { Role } from '../models/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  employee: Employee = new Employee();
  isAdmin: boolean = false;

  constructor() {
    if (this.employee.role !== undefined && this.employee.role === Role.ADMIN) {
      this.isAdmin = true;
    } else if (this.employee.role !== undefined && this.employee.role === Role.EMPLOYEE) {
      this.isAdmin = false;
    }
  }
}
