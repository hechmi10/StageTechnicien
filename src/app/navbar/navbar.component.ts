import { Component } from '@angular/core';
import { Employee } from '../models/employee';
import { Role } from '../models/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // Assuming employee is injected or set from a service
  employee: Employee | undefined;
  isAdmin!: boolean;
  isAuthenticated!: boolean;

  constructor() {
    this.isAuthenticated = !!this.employee;
    if (this.employee?.role === Role.ADMIN) {
      this.isAdmin = true;
    } else if (this.employee?.role === Role.EMPLOYEE) {
      this.isAdmin = false;
    }
  }
}
