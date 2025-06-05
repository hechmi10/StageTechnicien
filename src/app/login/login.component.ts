import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router,private _service:LoginService) { }
  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  onLogin(form: FormGroup) {
  if (form.valid) {
    const { email, password } = form.value;
    
    // First try employee login
    this._service.login({ email, password }).subscribe({
      next: (employeeData) => {
        if (employeeData.role === Role.ADMIN) {
          // If employee is actually admin, navigate to admin dashboard
          this.router.navigate(['/gestion-absence']);
        } else {
          this.router.navigate(['/pointage']);
        }
      },
      error: (employeeError) => {
        // If employee login fails, try admin login
        this._service.loginAdmin({ email, password }).subscribe({
          next: (adminData) => {
            this.router.navigate(['/gestion-absence']);
          },
          error: (adminError) => {
            console.error('Both login attempts failed');
            // Show error message to user
          }
        });
      }
    });
  }
}
}
