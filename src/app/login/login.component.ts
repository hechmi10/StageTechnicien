import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Role } from '../models/role'; // Import the Role enum

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(form: FormGroup) {
    if (!form.valid) {
      Object.keys(form.controls).forEach(key => {
        form.get(key)?.markAsTouched();
      });
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    this.errorMessage = '';
    const { email, password } = form.value;

    console.log('Login attempt:', { email });

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful, response:', response);
        const redirectUrl = this.authService.isAdmin() ? '/gestion-absence' : '/pointage';
        this.router.navigate([redirectUrl]).then(() => {
          const isAuthenticated = this.authService.isAuthenticated();
          console.log('Post-login isAuthenticated:', isAuthenticated);
          if (!isAuthenticated) {
            console.error('Authentication state not set correctly after login');
            this.errorMessage = 'Login succeeded, but authentication state failed. Please try again.';
          }
        });
        console.log('Redirecting to:', redirectUrl);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Login failed. Please check your credentials and ensure the server returns a valid token and role.';
        this.authService.logout(); // Clear any partial state
      }
    });
  }
}