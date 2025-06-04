import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) { }
  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  onLogin(form: any) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      console.log('Login successful for:', email);
      // Example: Assume you get the user's role from the form or a service
      const userRole = Role.ADMIN; // Replace with actual logic to get the user's role
      if (userRole === Role.ADMIN) {
        this.router.navigate(['/gestion-absence']);
        // Here you would typically call a service to handle the login logic
      } else {
        console.log('User does not have admin privileges');
      }

    }
  }
}
